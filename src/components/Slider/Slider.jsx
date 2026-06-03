"use client";

import "./Slider.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import Link from "next/link";
import Image from "next/image";
import "swiper/css";
import "swiper/css/pagination";

import { useEffect, useState } from "react";

export default function Slider({ sliders }) {
  const [showSwiper, setShowSwiper] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => {
      setShowSwiper(true);
    }, 800); // 👈 delay nhẹ sau khi LCP load xong

    return () => clearTimeout(t);
  }, []);

  if (!sliders || sliders.length === 0) return null;

  const first = sliders[0];
  const rest = sliders.slice(1);

  return (
    <section className="heroSlider">

      {/* ⭐ LCP STATIC */}
      <div className="heroSlide lcpSlide">
        <Image
          src={first.image_desktop || first.image_mobile || first.image}
          alt={first.title}
          fill
          priority
          sizes="100vw"
          className="heroImg"
        />

        <div className="heroOverlay" />

        <div className="heroContent">
          <h1>{first.title}</h1>

          <div className="heroActions">
            <Link href="/booking" className="btnPrimary">Đặt lịch ngay</Link>
            <Link href="/services" className="btnOutline">Xem dịch vụ</Link>
            <Link href="/posts" className="btnOutline">Xem bài viết</Link>
          </div>
        </div>
      </div>

      {/* ⭐ SWIPER DELAYED */}
      {showSwiper && rest.length > 0 && (
        <Swiper
          modules={[Autoplay, Pagination]}
          slidesPerView={1}
          loop
          speed={1000}
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
          }}
          pagination={{ clickable: true }}
          className="heroSwiper"
        >
          {rest.map((item) => (
            <SwiperSlide key={item.id}>
              <div className="heroSlide">

                <Image
                  src={item.image_desktop || item.image_mobile || item.image}
                  alt={item.title}
                  fill
                  sizes="100vw"
                  className="heroImg"
                />

                <div className="heroOverlay" />

                <div className="heroContent">
                  <h1>{item.title}</h1>

                  <div className="heroActions">
                    <Link href="/booking" className="btnPrimary">Đặt lịch ngay</Link>
                    <Link href="/services" className="btnOutline">Xem dịch vụ</Link>
                    <Link href="/posts" className="btnOutline">Xem bài viết</Link>
                  </div>
                </div>

              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </section>
  );
}