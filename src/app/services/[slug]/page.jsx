import { supabase } from "@/lib/supabase";

export default async function Page({ params }) {
  const { slug } = await params; // 🔥 FIX QUAN TRỌNG NHẤT

  console.log("SLUG:", slug);

  if (!slug) {
    return <div>❌ Không có slug</div>;
  }

  const { data, error } = await supabase
    .from("services")
    .select("*")
    .eq("slug", slug)
    .maybeSingle();

  if (!data) {
    return <div>❌ Không tìm thấy dịch vụ</div>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>{data.title}</h1>
      <p>{data.short_description}</p>

      {data.image && (
        <img src={data.image} alt={data.title} width="100%" />
      )}

      <div dangerouslySetInnerHTML={{ __html: data.content }} />
    </div>
  );
}