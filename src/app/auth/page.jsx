"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import "./page.css"
export default function AuthPage() {
  const router = useRouter();

  const [mode, setMode] = useState("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // =========================
  // LOGIN (FIX CHUẨN ROLE)
  // =========================
  const handleLogin = async () => {
    setLoading(true);

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (error) return alert(error.message);

    const user = data.user;

    if (!user) return alert("Login fail");

    // lấy role từ DB
    const { data: profile, error: profileError } = await supabase
      .from("users")
      .select("role")
      .eq("id", user.id)
      .single();

    if (profileError || !profile) {
      return alert("Không lấy được role user");
    }

    // =========================
    // ROUTE THEO ROLE (QUAN TRỌNG)
    // =========================
    if (profile.role === "admin") {
      router.push("/");
    } else {
      router.push("/");
    }
  };

  // =========================
  // REGISTER
  // =========================
  const handleRegister = async () => {
    if (!name.trim()) return alert("Nhập họ tên");

    setLoading(true);

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    setLoading(false);

    if (error) return alert(error.message);

    const user = data?.user;

    if (!user) return alert("Không tạo user");

    // insert user mặc định role = user
    const { error: insertError } = await supabase.from("users").insert([
      {
        id: user.id,
        email,
        name,
        role: "user",
      },
    ]);

    if (insertError) {
      return alert("Lỗi tạo profile user");
    }

    alert("Đăng ký thành công!");
    setMode("login");
  };

  return (
    <div className="authPage">
      <div className="authCard">
        <h1>{mode === "login" ? "Đăng nhập" : "Đăng ký"}</h1>

        {mode === "register" && (
          <input
            placeholder="Họ tên"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        )}

        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Mật khẩu"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={mode === "login" ? handleLogin : handleRegister}
          disabled={loading}
        >
          {loading
            ? "Đang xử lý..."
            : mode === "login"
            ? "Đăng nhập"
            : "Đăng ký"}
        </button>

        <p
          onClick={() =>
            setMode(mode === "login" ? "register" : "login")
          }
          style={{ cursor: "pointer" }}
        >
          {mode === "login"
            ? "Chưa có tài khoản? Đăng ký"
            : "Đã có tài khoản? Đăng nhập"}
        </p>
      </div>
    </div>
  );
}