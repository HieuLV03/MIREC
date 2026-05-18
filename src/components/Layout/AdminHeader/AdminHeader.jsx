"use client";

import Link from "next/link";

export default function AdminHeader() {
  return (
    <div className="adminBar">

      <Link href="/admin">
        Dashboard
      </Link>

      <Link href="/admin/posts/create">
        ➕ Bài viết
      </Link>

      <Link href="/admin/services/create">
        ➕ Dịch vụ
      </Link>

    </div>
  );
}