"use client";
import { useState } from "react";
import "./page.css";

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);

    try {
      const res = await fetch("/api", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (data.success) {
        setSuccess(true);
        setForm({
          name: "",
          phone: "",
          email: "",
          message: "",
        });

        setTimeout(() => {
          setSuccess(false);
        }, 5000);
      } else {
        alert("Gửi thất bại!");
      }
    } catch (err) {
      alert("Có lỗi xảy ra!");
    }

    setLoading(false);
  };

  return (
    <div className="contact">

      {/* HERO */}
      <div className="contact-hero">
        <h1>Liên hệ với chúng tôi</h1>
        <p>
          Gửi thông tin hoặc yêu cầu hỗ trợ, chúng tôi sẽ phản hồi nhanh nhất có thể.
        </p>
      </div>

      <div className="contact-wrapper">

        {/* FORM */}
        <div className="contact-form">
          <p>Điền thông tin, chúng tôi sẽ liên hệ lại cho bạn sớm nhất</p>

          <form onSubmit={handleSubmit} className="booking-form">
            <input
              name="name"
              placeholder="Họ và tên"
              value={form.name}
              onChange={handleChange}
              required
            />

            <input
              name="phone"
              placeholder="Số điện thoại"
              value={form.phone}
              onChange={handleChange}
              required
            />

            <input
              name="email"
              placeholder="Email (không bắt buộc)"
              value={form.email}
              onChange={handleChange}
            />

            <textarea
              name="message"
              placeholder="Bạn cần tư vấn gì?"
              value={form.message}
              onChange={handleChange}
              required
            />

            <button disabled={loading}>
              {loading ? "Đang gửi..." : "Gửi yêu cầu"}
            </button>

            {success && (
              <div className="success">
                ✔ Gửi thành công! Chúng tôi sẽ liên hệ bạn sớm.
              </div>
            )}
          </form>
        </div>

        {/* INFO */}
        <div className="contact-info">
          <h2>Thông tin</h2>

          <p>📍 Địa chỉ: 15A Sông Đà, Phường Tân Sơn Hòa, TP. HCM</p>
          <p>📞 Số điện thoại: 0372 089 821 </p>
          <p>📧 Email: thammyvienhisu@gmai.com</p>

          <div className="contact-note">
            Cảm ơn Quý khách hàng đã luôn tin tưởng và sử dụng dịch vụ của HISU
          </div>
        </div>

      </div>
    </div>
  );
}