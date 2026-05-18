import { supabase } from "@/lib/supabase";

export default async function PostPage({ params }) {
  const { slug } = await params;

  if (!slug) {
    return <div>❌ Không có slug</div>;
  }

  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .eq("slug", slug)
    .eq("status", "published")
    .single();

  if (error || !data) {
    return <div>❌ Không tìm thấy bài viết</div>;
  }

  return (
    <div style={{ padding: 40, maxWidth: 800, margin: "auto" }}>
      <h1>{data.title}</h1>
      <p style={{ color: "#666" }}>{data.description}</p>

      {data.thumbnail && (
        <img
          src={data.thumbnail}
          alt={data.title}
          style={{ width: "100%", borderRadius: 12, margin: "20px 0" }}
        />
      )}

      <div
        dangerouslySetInnerHTML={{ __html: data.content }}
      />
    </div>
  );
}