"use client";

import Link from "next/link";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footerContainer">

        {/* BRAND */}
        <div className="footerBrand">
          <h2>THẨM MỸ VIỆN HISU</h2>
          <p>
            Nâng tầm nhan sắc với công nghệ thẩm mỹ hiện đại, an toàn và tự nhiên.
          </p>
        </div>

        {/* COMPANY INFO */}
        <div className="footerCompany">
          <h3>CÔNG TY TNHH HISU BEAUTY</h3>

          <p>
            <strong>🏢 Trụ sở chính:</strong><br />
            354/47 Quốc lộ 1, P. Bình Tân, TP.HCM
          </p>

          <p>
            <strong>🏥 Cơ sở 2:</strong><br />
            15A Sông Đà, P. Tân Sơn Hòa, TP.HCM
          </p>

          <p>
            <strong>📞 Điện thoại:</strong> 0372 089 821
          </p>

          <p>
            <strong>📧 Email:</strong> thammyvienhisu@gmail.com
          </p>

          <p>
            <strong>🌐 Website:</strong> www.hisu.com
          </p>
        </div>

        {/* LINKS */}
        <div className="footerLinks">
          <h3>Liên kết</h3>

          <Link href="/">Trang chủ</Link>
          <Link href="/services">Dịch vụ</Link>
          <Link href="/posts">Bài viết</Link>
          <Link href="/booking">Đặt lịch</Link>
        </div>

        {/* SOCIAL / HOTLINE */}
        <div className="footerContact">
          <h3>Hotline hỗ trợ</h3>

          <p>📞 0372 089 821</p>

          <p>💬 Tư vấn 24/7</p>

          <h3>Mạng xã hội</h3>

          <div className="social">
            <a href="https://www.facebook.com/profile.php?id=61564510092133">
              Facebook HISU Beauty
            </a>
          </div>

          <div className="social">
            <a href="https://www.facebook.com/profile.php?id=61588684948414">
              Fanpage dịch vụ
            </a>
          </div>
        </div>

      </div>

      <div className="footerBottom">
        © {new Date().getFullYear()} HISU Beauty. All rights reserved.
      </div>
    </footer>
  );
}