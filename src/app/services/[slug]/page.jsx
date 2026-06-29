import { supabase } from "@/lib/supabase";
import "./page.css";
import Image from "next/image";
import { notFound } from "next/navigation";
import BackButton from "@/components/BackButton/BackButton";
import Link from "next/link";

// FIX CACHE
export const revalidate = 3600;
export const dynamicParams = true;
export async function generateStaticParams() {
  const { data, error } = await supabase
    .from("services")
    .select("slug")
    .eq("status", "published");

  if (error || !Array.isArray(data)) {
    return [];
  }

  return data.map((item) => ({
    slug: item.slug,
  }));
}
export async function generateMetadata({
  params,
}) {
  const { slug } = params;

  const { data } = await supabase
    .from("services")
    .select("*")
    .eq("slug", slug)
    .eq("status", "published")
    .maybeSingle();

  if (!data) {
    return {
      title: "Không tìm thấy dịch vụ",
    };
  }

  const title =
    data.meta_title || data.title;

  const description =
    data.meta_description ||
    data.short_description;

  const url = `/services/${data.slug}`;

  return {
    metadataBase: new URL(
      "https://thammyvienhisu.online"
    ),

    title,

    description,

    keywords: [
      data.title,
      "phun môi",
      "phun mày",
      "phun xăm thẩm mỹ",
      "thẩm mỹ viện HISU",
      "phun môi collagen",
      "phun môi TP.HCM",
    ],

    authors: [
      {
        name: "HISU Beauty",
      },
    ],

    robots: {
      index: true,
      follow: true,
    },

    alternates: {
      canonical: url,
    },

    openGraph: {
      title,

      description,

      url,

      siteName:
        "Thẩm mỹ viện HiSu",

      locale: "vi_VN",

      type: "article",

      publishedTime:
        data.created_at,

      modifiedTime:
        data.updated_at,

      images: data.image
        ? [
            {
              url: data.image,
              width: 1200,
              height: 630,
              alt: data.title,
            },
          ]
        : [],
    },

    twitter: {
      card:
        "summary_large_image",

      title,

      description,

      images: data.image
        ? [data.image]
        : [],
    },
  };
}

export default async function Page({
  params,
}) {
  const { slug } = params;

  const { data, error } =
    await supabase
      .from("services")
      .select("*")
      .eq("slug", slug)
      .eq("status", "published")
      .maybeSingle();

  if (error || !data) {
    notFound();
  }

  return (
    <div className="page">
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      "@context":
        "https://schema.org",

      "@type": "Service",

      name: data.title,

      description:
        data.short_description,

      image: [data.image],

      url: `https://thammyvienhisu.online/services/${data.slug}`,

      serviceType:
        data.title,

      areaServed: {
        "@type": "City",
        name: "TP.HCM",
      },

      provider: {
        "@type":
          "BeautySalon",

        name:
          "Thẩm mỹ viện HiSu",

        url:
          "https://thammyvienhisu.online",

        logo: {
          "@type":
            "ImageObject",

          url:
            "https://thammyvienhisu.online/logo.png",
        },
      },

      offers: {
        "@type": "Offer",

        price:
          data.price || 0,

        priceCurrency:
          "VND",

        availability:
          "https://schema.org/InStock",
      },

      mainEntityOfPage: {
        "@type":
          "WebPage",

        "@id": `https://thammyvienhisu.online/services/${data.slug}`,
      },
    }),
  }}
/>
      <BackButton />

      <h1 className="title">
        {data.title}
      </h1>

  <p className="desc">
  {data.short_description}
</p>

{/* PRICE */}
{data.price && (
  <div className="priceBox">
    <span className="priceLabel">
      Giá chỉ
    </span>

    <div className="priceValue">
      {Number(data.price).toLocaleString("vi-VN")}

      <span className="currency">
        đ
      </span>
    </div>
  </div>
)}
{data.image && (
  <div className="serviceImageWrap">
    <Image
      src={data.image}
      alt={data.title}
      width={1200}
      height={800}
      priority
      className="serviceImage"
    />
  </div>
)}
      <div
        className="content"
        dangerouslySetInnerHTML={{
          __html:
            data.content || "",
        }}
      />
<div className="ctaBox">
  <div className="ctaBadge">
    ✨ Ưu đãi đặc biệt hôm nay
  </div>

  <h2 className="ctaTitle">
    Đặt lịch ngay hôm nay để nhận ưu đãi hấp dẫn
  </h2>

  <p className="ctaText">
    Đặt lịch cùng HISU Beauty để được tư vấn miễn phí, 
    chọn tone phù hợp khuôn mặt và nhận ưu đãi dành riêng hôm nay.
  </p>

  <div className="ctaButtons">
    <Link
      href="/booking"
      className="ctaBtn primary"
    >
      📅 Đặt lịch ngay
    </Link>

    <a
      href="https://zalo.me/0372089821"
      target="_blank"
      className="ctaBtn secondary"
    >
      💬 Tư vấn qua Zalo
    </a>
  </div>
</div>
    </div>
  );
}