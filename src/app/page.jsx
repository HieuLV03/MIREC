"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

import "./page.css";

export default function HomePage() {
  const [services, setServices] = useState([]);
  const [posts, setPosts] = useState([]);
  const [sliders, setSliders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHomeData();
  }, []);

  async function fetchHomeData() {
    try {
      const { data: sliderData } = await supabase
        .from("sliders")
        .select("*")
        .eq("status", "published")
        .order("created_at", { ascending: false });

      const { data: serviceData } = await supabase
        .from("services")
        .select("*")
        .eq("status", "published")
        .order("created_at", { ascending: false })
        .limit(6);

      const { data: postData } = await supabase
        .from("posts")
        .select("*")
        .eq("status", "published")
        .order("created_at", { ascending: false })
        .limit(3);

      setSliders(sliderData || []);
      setServices(serviceData || []);
      setPosts(postData || []);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="homePage">

      {/* HERO */}
      <section className="heroSlider">

        {sliders.length > 0 && (
          <Swiper
            modules={[Autoplay, Pagination]}
            slidesPerView={1}
            loop={sliders.length > 1}
            speed={1000}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            pagination={{ clickable: true }}
            className="heroSwiper"
          >
            {sliders.map((item) => (
              <SwiperSlide key={item.id}>

                <div className="heroSlide">

                  <picture>
                    <source
                      media="(max-width: 768px)"
                      srcSet={item.image_mobile}
                    />

                    <img
                      src={item.image_desktop}
                      alt={item.title}
                    />
                  </picture>

                  <div className="heroOverlay" />

                  <div className="heroContent">
                    <span className="heroBadge">
                      THẨM MỸ VIỆN HISU
                    </span>

                    <h1>{item.title}</h1>

                    <p>
                      Hệ thống thẩm mỹ & chăm sóc sắc đẹp chuyên nghiệp.
                    </p>

                    <div className="heroButtons">
                      <Link href="/booking" className="btnPrimary">
                        Đặt lịch ngay
                      </Link>

                      <Link href="/services" className="btnOutline">
                        Xem dịch vụ
                      </Link>

                      <Link href="/posts" className="btnOutline">
                        Xem bài viết
                      </Link>
                    </div>

                  </div>

                </div>

              </SwiperSlide>
            ))}
          </Swiper>
        )}

      </section>

      {/* SERVICES */}
      <section className="section">
        <div className="sectionHeader">
          <span className="sectionTag">DỊCH VỤ</span>
          <h2>Dịch vụ nổi bật</h2>
        </div>

        {loading ? (
          <p className="loading">Đang tải...</p>
        ) : (
          <div className="serviceGrid">
            {services.map((item) => (
              <Link
                key={item.id}
                href={`/services/${item.slug}`}
                className="serviceCard"
              >
                <div className="serviceImg">
                  <img src={item.image} alt={item.title} />
                </div>

                <div className="serviceBody">
                  <h3>{item.title}</h3>
                  <p>{item.short_description}</p>
                  <span>
                    {Number(item.price || 0).toLocaleString("vi-VN")}đ
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* BLOG */}
      <section className="section">
        <div className="sectionHeader">
          <span className="sectionTag">BLOG</span>
          <h2>Bài viết mới</h2>
        </div>

        <div className="blogGrid">
          {posts.map((post) => (
            <Link
              key={post.id}
              href={`/posts/${post.slug}`}
              className="blogCard"
            >
              {post.image && (
                <div className="blogImg">
                  <img src={post.image} alt={post.title} />
                </div>
              )}

              <div className="blogBody">
                <h3>{post.title}</h3>
                <p>{post.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

    </main>
  );
}