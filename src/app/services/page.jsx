import Link from "next/link";

import { supabase } from "@/lib/supabase";


import "./page.css";

export const revalidate = 3600;

export default async function HomePage() {

  const [ serviceRes, postRes] =
    await Promise.all([

      supabase
        .from("services")
        .select("*")
        .eq("status", "published")
        .order("created_at", {
          ascending: false,
        }),

      supabase
        .from("posts")
        .select("*")
        .eq("status", "published")
        .order("created_at", {
          ascending: false,
        })
        .limit(3),
    ]);

  const services = serviceRes.data || [];
  const posts = postRes.data || [];

  return (
    <main className="home">

      {/* HERO */}

      {/* SERVICES */}
      <section className="section">

        <div className="sectionHeader">
          <h2>Dịch vụ</h2>
        </div>

        <div className="serviceGrid">

          {services.map((s) => (

            <Link
              key={s.id}
              href={`/services/${s.slug}`}
              className="serviceCard"
            >

              <div className="serviceImg">

                <img
                  src={s.image}
                  alt={s.title}
                  loading="lazy"
                  decoding="async"
                />

                <div className="imgOverlay">

                  <span className="imgBtn">
                    Xem chi tiết
                  </span>

                </div>

              </div>

              <div className="serviceBody">

                <h3>{s.title}</h3>
                <p>{s.short_description}</p>
                <div className="priceBox">

                  <span className="priceLabel">
                    Giá từ
                  </span>

                  <div className="priceValue">

                    {Number(
                      s.price || 0
                    ).toLocaleString("vi-VN")}

                    <span className="currency">
                      đ
                    </span>

                  </div>

                </div>

              </div>

            </Link>

          ))}

        </div>

      </section>

      {/* BLOG */}
      <section className="section">

        <div className="sectionHeader">
          <h2>Bài viết mới</h2>
        </div>

        <div className="blogGrid">

          {posts.map((p) => (

            <Link
              key={p.id}
              href={`/posts/${p.slug}`}
              className="blogCard"
            >

              <div className="blogImg">

                <img
                  src={p.image}
                  alt={p.title}
                  loading="lazy"
                  decoding="async"
                />

                <div className="imgOverlay">

                  <span className="imgBtn">
                    Xem bài viết
                  </span>

                </div>

              </div>

              <div className="blogBody">

                <h3>{p.title}</h3>

                <p>{p.description}</p>

              </div>

            </Link>

          ))}

        </div>

      </section>

    </main>
  );
}