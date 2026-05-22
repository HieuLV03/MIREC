import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export async function POST(req) {
  try {
    const body = await req.json();

    // trả về ngay lập tức
    const response = Response.json({ success: true });

    // gửi mail chạy nền
    setTimeout(async () => {
      try {
        await transporter.sendMail({
          from: `"Website Booking" <${process.env.EMAIL_USER}>`,
          to: process.env.EMAIL_USER,
          subject: "📩 Khách hàng cần tư vấn mới",
          html: `
            <h2>Thông tin booking mới</h2>
            <p><b>Tên:</b> ${body.name}</p>
            <p><b>SĐT:</b> ${body.phone}</p>
            <p><b>Email:</b> ${body.email}</p>
            <p><b>Nội dung:</b> ${body.message}</p>
          `,
        });
      } catch (err) {
        console.log("Mail error:", err.message);
      }
    }, 0);

    return response;
  } catch (err) {
    return Response.json({ success: false, error: err.message });
  }
}