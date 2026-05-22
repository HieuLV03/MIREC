import nodemailer from "nodemailer";

export const runtime = "nodejs";

// 🔥 FIX: tạo transporter trong function để tránh cache lỗi env
const createTransporter = () =>
  nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS, // APP PASSWORD (KHÔNG phải password thường)
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

export async function POST(req) {
  try {
    const body = await req.json();

    // check env
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      return Response.json({
        success: false,
        error: "Missing EMAIL env",
      });
    }

    const transporter = createTransporter();

    console.log("📩 Sending email...");

    await transporter.sendMail({
      from: `"Website Booking" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      subject: "📩 Khách hàng cần tư vấn mới",
      html: `
        <h2>Thông tin booking mới</h2>
        <p><b>Tên:</b> ${body.name}</p>
        <p><b>SĐT:</b> ${body.phone}</p>
        <p><b>Email:</b> ${body.email || "Không có"}</p>
        <p><b>Nội dung:</b> ${body.message}</p>
      `,
    });

    console.log("✅ Email sent");

    return Response.json({ success: true });
  } catch (err) {
    console.error("❌ Mail error:", err);

    return Response.json({
      success: false,
      error: err.message,
    });
  }
}