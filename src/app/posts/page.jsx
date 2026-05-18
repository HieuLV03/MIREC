"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import "./page.css";

export default function PostsPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPosts();
  }, []);

  async function fetchPosts() {
    setLoading(true);

    const { data, error } = await supabase
      .from("posts")
      .select("*")
      .eq("status", "published")
      .order("created_at", { ascending: false });

    if (!error) setPosts(data || []);
    else setPosts([]);

    setLoading(false);
  }

  return (
    <main className="postsPage">

      {/* HERO SECTION */}
      <section className="postsHero">
        <div className="postsHeroContent">
          <span className="badge">HISU BEAUTY BLOG</span>

          <h1>Kiến thức làm đẹp & xu hướng thẩm mỹ</h1>

          <p>
            Cập nhật công nghệ, chăm sóc da và bí quyết làm đẹp chuẩn clinic.
          </p>
        </div>
      </section>

      {/* CONTENT */}
      <section className="postsContainer">

        {loading ? (
          <div className="stateBox">Đang tải bài viết...</div>
        ) : posts.length === 0 ? (
          <div className="stateBox">Chưa có bài viết nào</div>
        ) : (
          <div className="postsGrid">

            {posts.map((post, index) => (
              <Link
                href={`/posts/${post.slug}`}
                key={post.id}
                className={`postCard ${index === 0 ? "featured" : ""}`}
              >

                <div className="postImage">
                  <img
                    src={post.thumbnail || "/images/default-post.jpg"}
                    alt={post.title}
                  />
                </div>

                <div className="postContent">

                  <div className="postMeta">
                    {post.created_at &&
                      new Date(post.created_at).toLocaleDateString("vi-VN")}
                  </div>

                  <h3>{post.title}</h3>

                  <p>
                    {post.description
                      ? post.description.slice(0, 120) + "..."
                      : ""}
                  </p>

                  <span className="readMore">Đọc thêm →</span>

                </div>

              </Link>
            ))}

          </div>
        )}

      </section>

    </main>
  );
}