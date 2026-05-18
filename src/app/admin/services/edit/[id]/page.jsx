"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import "./page.css";

export default function EditServicePage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id;

  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [oldSlug, setOldSlug] = useState("");

  const [form, setForm] = useState({
    title: "",
    slug: "",
    short_description: "",
    content: "",
    category: "",
    price: "",
    image: "",
    meta_title: "",
    meta_description: "",
    meta_keywords: "",
    status: "published",
    is_featured: false,
  });

  // =========================
  // SLUG GENERATOR
  // =========================
  const sanitize = (text) => {
    return text
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/đ/g, "d")
      .replace(/[^a-z0-9\s-]/g, "")
      .trim()
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");
  };

  const randomString = () =>
    Math.random().toString(36).substring(2, 8);

  // =========================
  // FETCH DATA
  // =========================
  useEffect(() => {
    const fetchData = async () => {
      if (!id) return;

      const { data } = await supabase
        .from("services")
        .select("*")
        .eq("id", id)
        .maybeSingle();

      if (data) {
        setOldSlug(data.slug || "");

        setForm({
          title: data.title || "",
          slug: data.slug || "",
          short_description: data.short_description || "",
          content: data.content || "",
          category: data.category || "",
          price: data.price || "",
          image: data.image || "",
          meta_title: data.meta_title || "",
          meta_description: data.meta_description || "",
          meta_keywords: data.meta_keywords || "",
          status: data.status || "published",
          is_featured: data.is_featured || false,
        });
      }
    };

    fetchData();
  }, [id]);

  // =========================
  // GET STORAGE PATH
  // =========================
  const getPathFromUrl = (url) => {
    if (!url) return null;
    const parts = url.split("images_service/");
    return parts.length > 1 ? parts[1] : null;
  };

  // =========================
  // UPLOAD IMAGE (SAFE)
  // =========================
  const handleUploadImage = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploading(true);

      const fileExt = file.name.split(".").pop();
      const fileName = `${form.slug || "service"}-${Date.now()}-${randomString()}.${fileExt}`;

      const { error } = await supabase.storage
        .from("images_service")
        .upload(fileName, file);

      if (error) throw error;

      const { data } = supabase.storage
        .from("images_service")
        .getPublicUrl(fileName);

      // xóa ảnh cũ
      if (form.image) {
        const oldPath = getPathFromUrl(form.image);
        if (oldPath) {
          await supabase.storage
            .from("images_service")
            .remove([oldPath]);
        }
      }

      setForm((prev) => ({
        ...prev,
        image: data.publicUrl,
      }));
    } catch (err) {
      console.log(err);
    } finally {
      setUploading(false);
    }
  };

  // =========================
  // UPDATE SERVICE
  // =========================
  const update = async () => {
    setLoading(true);

    try {
      let finalImage = form.image;

      const slugChanged = oldSlug && oldSlug !== form.slug;

      // rename image nếu đổi slug
      if (slugChanged && form.image) {
        const oldPath = getPathFromUrl(form.image);

        if (oldPath) {
          const fileExt = oldPath.split(".").pop();
          const newFileName = `${form.slug}-${Date.now()}.${fileExt}`;

          const { error } = await supabase.storage
            .from("images_service")
            .copy(oldPath, newFileName);

          if (!error) {
            const { data } = supabase.storage
              .from("images_service")
              .getPublicUrl(newFileName);

            finalImage = data.publicUrl;

            await supabase.storage
              .from("images_service")
              .remove([oldPath]);
          }
        }
      }

      // =========================
      // UPDATE DB
      // =========================
      const { error } = await supabase
        .from("services")
        .update({
          title: form.title,
          slug: form.slug,

          short_description: form.short_description,
          content: form.content,
          category: form.category,
          price: Number(form.price || 0),
          image: finalImage,

          meta_title: form.meta_title,
          meta_description: form.meta_description,
          meta_keywords: form.meta_keywords,

          status: form.status,
          is_featured: form.is_featured,

          updated_at: new Date().toISOString(),
        })
        .eq("id", id);

      if (error) throw error;

      setOldSlug(form.slug);

      alert("Cập nhật thành công!");
      router.refresh();
    } catch (err) {
      console.log(err);
      alert("Lỗi cập nhật");
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // UI
  // =========================
  return (
    <div className="editServicePage">
      <div className="editServiceCard">
        <h1>Sửa dịch vụ</h1>

        {/* TITLE */}
        <input
          placeholder="Title"
          value={form.title}
          onChange={(e) => {
            const title = e.target.value;
            setForm({
              ...form,
              title,
              slug: sanitize(title),
            });
          }}
        />

        {/* SLUG */}
        <input
          placeholder="Slug"
          value={form.slug}
          onChange={(e) =>
            setForm({ ...form, slug: sanitize(e.target.value) })
          }
        />
        <input
          placeholder="Category"
          value={form.category}
          onChange={(e) =>
            setForm({ ...form, category: e.target.value })
          }
        />

        <input
          placeholder="Price"
          value={form.price}
          onChange={(e) =>
            setForm({ ...form, price: e.target.value })
          }
        />

        {/* IMAGE */}
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <input type="file" onChange={handleUploadImage} />

          {uploading && <p>Đang upload...</p>}

          {form.image && (
            <img
              src={form.image}
              style={{
                width: "100%",
                maxHeight: 220,
                objectFit: "cover",
                borderRadius: 12,
              }}
            />
          )}
        </div>

        <textarea
          placeholder="Short description"
          value={form.short_description}
          onChange={(e) =>
            setForm({
              ...form,
              short_description: e.target.value,
            })
          }
        />

        <textarea
          placeholder="Content"
          value={form.content}
          onChange={(e) =>
            setForm({ ...form, content: e.target.value })
          }
        />

        <input
          placeholder="Meta title"
          value={form.meta_title}
          onChange={(e) =>
            setForm({ ...form, meta_title: e.target.value })
          }
        />

        <input
          placeholder="Meta description"
          value={form.meta_description}
          onChange={(e) =>
            setForm({ ...form, meta_description: e.target.value })
          }
        />

        <input
          placeholder="Meta keywords"
          value={form.meta_keywords}
          onChange={(e) =>
            setForm({ ...form, meta_keywords: e.target.value })
          }
        />

        <select
          value={form.status}
          onChange={(e) =>
            setForm({ ...form, status: e.target.value })
          }
        >
          <option value="published">Hiển thị</option>
          <option value="hidden">Ẩn</option>
        </select>

        <label>
          <input
            type="checkbox"
            checked={form.is_featured}
            onChange={(e) =>
              setForm({
                ...form,
                is_featured: e.target.checked,
              })
            }
          />
          Featured
        </label>

        <button onClick={update} disabled={loading}>
          {loading ? "Đang lưu..." : "Cập nhật"}
        </button>
      </div>
    </div>
  );
}