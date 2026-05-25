import "./globals.css";
import Header from "@/components/Layout/Header/Header";
import Footer from "@/components/Layout/Footer/Footer";
import BookingPopup from "@/components/BookingPopup/BookingPopup";
import ZaloButton from "@/components/ZaloButton/ZaloButton";
import BookingButton from "@/components/BookingButton/BookingButton";

export const metadata = {
  metadataBase: new URL("https://thammyvienhisu.online"),

  title: {
    default: "THẨM MỸ VIỆN HISU",
    template: "%s | THẨM MỸ VIỆN HISU",
  },

  description: "Thẩm mỹ công nghệ cao",

  // ✔ GOOGLE VERIFICATION
  verification: {
    google: "4mLd0Os-KkaDCT-MWvcardRaqRs4ARy18-EvKlD6fdU",
  },

  // ✔ FAVICON + ICON (QUAN TRỌNG)
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
  },

  // ✔ HIỂN THỊ KHI SHARE FACEBOOK / GOOGLE
  openGraph: {
    title: "THẨM MỸ VIỆN HISU",
    description: "Thẩm mỹ công nghệ cao",
    url: "https://thammyvienhisu.online",
    siteName: "HISU",
    images: [
      {
        url: "/icon.png",
        width: 1200,
        height: 630,
      },
    ],
    type: "website",
  },
};