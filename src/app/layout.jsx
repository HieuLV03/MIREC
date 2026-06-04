import "./globals.css";
import ClientLayout from "@/components/Layout/ClientLayout";

import { Inter, Playfair_Display, Poppins } from "next/font/google";

const inter = Inter({
  subsets: ["latin", "vietnamese"],
  display: "swap",
  variable: "--font-inter",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-poppins",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  display: "swap",
  variable: "--font-playfair",
});

export const metadata = {
  metadataBase: new URL("https://thammyvienhisu.online"),
  title: {
    default: "THẨM MỸ VIỆN HISU - Phun Xăm Thẩm Mỹ",
    template: "%s | TMV HISU",
  },
  description:
    "HISU chuyên phun môi, phun mày, phun mí, phun hồng vùng kín tại TP.HCM.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="vi"
      className={`${inter.variable} ${playfair.variable} ${poppins.variable}`}
    >
      <head>
        {/* TikTok Pixel */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              !function (w, d, t) {
                w.TiktokAnalyticsObject=t;
                var ttq=w[t]=w[t]||[];

                ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","alias"];

                ttq.setAndDefer=function(t,e){
                  t[e]=function(){
                    t.push([e].concat(Array.prototype.slice.call(arguments,0)))
                  }
                };

                for(var i=0;i<ttq.methods.length;i++){
                  ttq.setAndDefer(ttq,ttq.methods[i]);
                }

                ttq.load=function(e){
                  var r="https://analytics.tiktok.com/i18n/pixel/events.js";
                  var s=document.createElement("script");
                  s.async=true;
                  s.src=r+"?sdkid="+e;
                  document.head.appendChild(s);
                };

                ttq.load('D8GE2OJC77U3N4JA967G');

                window.addEventListener('load', function () {
                  setTimeout(function () {
                    if (window.ttq && window.ttq.track) {
                      window.ttq.track('PageView');
                    }
                  }, 1200);
                });

              }(window, document, 'ttq');
            `,
          }}
        />
      </head>

      <body className="appBody">
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}