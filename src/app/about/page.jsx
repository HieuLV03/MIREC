import "./page.css";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="about">

      {/* HERO */}
      <div className="about-hero">
        <h1>Giới thiệu về chúng tôi</h1>
        <p>
          Chúng tôi cam kết mang đến dịch vụ và sản phẩm chất lượng cao,
          giúp khách hàng có trải nghiệm tốt nhất.
        </p>
      </div>

      {/* WHO WE ARE */}
      <div className="about-section">
        <h2>Chúng tôi là ai</h2>
        <p>
          Chúng tôi là đội ngũ trẻ, năng động và luôn không ngừng cải tiến
          để mang lại giải pháp hiện đại, tiện lợi và hiệu quả cho khách hàng.
        </p>
      </div>

      {/* MISSION / VISION */}
      <div className="about-grid">
        <div className="about-box">
          <h3>Sứ mệnh</h3>
          <p>
            Cung cấp dịch vụ chất lượng, uy tín và mang lại sự hài lòng cao nhất cho khách hàng.
          </p>
        </div>

        <div className="about-box">
          <h3>Tầm nhìn</h3>
          <p>
            Trở thành đơn vị hàng đầu trong lĩnh vực, được khách hàng tin tưởng và lựa chọn.
          </p>
        </div>
      </div>

      {/* CORE VALUES */}
      <div className="about-section">
        <h2>Giá trị cốt lõi</h2>
        <ul>
          <li>✔ Chất lượng đặt lên hàng đầu</li>
          <li>✔ Khách hàng là trung tâm</li>
          <li>✔ Minh bạch và uy tín</li>
          <li>✔ Không ngừng cải tiến</li>
        </ul>
      </div>

      {/* CTA */}
      <div className="about-cta">
        <h2>Bạn cần hỗ trợ?</h2>
        <p>Liên hệ với chúng tôi để được tư vấn nhanh nhất</p>

        <Link href="/contact" className="btnOutline">
          Liên hệ ngay
        </Link>

      </div>

    </div>
  );
}