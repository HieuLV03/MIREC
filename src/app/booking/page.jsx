"use client";

import { useState } from "react";
import "./page.css";

export default function BookingPage() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
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
      setForm({ name: "", phone: "", email: "", message: "" });

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
    <div className="booking-container">
      <div className="booking-box">
        <h1>Đặt lịch tư vấn</h1>
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
    </div>
  );
}