"use client";

import Link from "next/link";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footerContainer">

        {/* LEFT - BRAND */}
        <div className="footerBrand">
          <h2>THẨM MỸ VIỆN HISU</h2>
          <p>
            Nâng tầm nhan sắc với công nghệ thẩm mỹ hiện đại, an toàn và tự nhiên.
          </p>
        </div>

        {/* CENTER - LINKS */}
        <div className="footerLinks">
          <h3>Khám phá</h3>
          <Link href="/">Trang chủ</Link>
          <Link href="/services">Dịch vụ</Link>
          <Link href="/posts">Bài viết</Link>
          <Link href="/booking">Đặt lịch</Link>
        </div>

        {/* RIGHT - CONTACT */}
        <div className="footerContact">
          <h3>Liên hệ</h3>
          <p>📞 0372 089 821</p>
          <p>📧 thammyvienhisu@gmail.com</p>
          <p>📍 TP. Hồ Chí Minh</p>

          <div className="social">
            <a href="#">Facebook</a>
            <a href="#">Instagram</a>
            <a href="#">TikTok</a>
          </div>
        </div>

      </div>

      <div className="footerBottom">
        © {new Date().getFullYear()} HISU. All rights reserved.
      </div>
    </footer>
  );
}