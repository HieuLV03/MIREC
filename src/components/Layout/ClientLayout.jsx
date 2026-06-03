"use client";

import dynamic from "next/dynamic";

const ZaloButton = dynamic(() => import("@/components/ZaloButton/ZaloButton"), {
  ssr: false,
});

const BookingButton = dynamic(() => import("@/components/BookingButton/BookingButton"), {
  ssr: false,
});

const BookingPopup = dynamic(() => import("@/components/BookingPopup/BookingPopup"), {
  ssr: false,
});

import Header from "@/components/Layout/Header/Header";
import Footer from "@/components/Layout/Footer/Footer";

export default function ClientLayout({ children }) {
  return (
    <>
      <Header />
      <main className="mainContent">{children}</main>

      <ZaloButton />
      <BookingButton />
      <BookingPopup />

      <Footer />
    </>
  );
}