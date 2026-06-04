import "./globals.css";
import ClientLayout from "@/components/Layout/ClientLayout";

import Script from "next/script";

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
  <script
    dangerouslySetInnerHTML={{
      __html: `
      !function (w, d, t) {
        w.TiktokAnalyticsObject=t;
        var ttq=w[t]=w[t]||[];

        ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie","holdConsent","revokeConsent","grantConsent"];

        ttq.setAndDefer=function(t,e){
          t[e]=function(){
            t.push([e].concat(Array.prototype.slice.call(arguments,0)))
          }
        };

        for(var i=0;i<ttq.methods.length;i++){
          ttq.setAndDefer(ttq,ttq.methods[i]);
        }

        ttq.instance=function(t){
          for(var e=ttq._i[t]||[],n=0;n<ttq.methods.length;n++){
            ttq.setAndDefer(e,ttq.methods[n]);
          }
          return e;
        };

        ttq.load=function(e,n){
          var r="https://analytics.tiktok.com/i18n/pixel/events.js";
          ttq._i=ttq._i||{};
          ttq._i[e]=[];
          ttq._i[e]._u=r;
          ttq._t=ttq._t||{};
          ttq._t[e]=+new Date;
          ttq._o=ttq._o||{};
          ttq._o[e]=n||{};

          var s=document.createElement("script");
          s.type="text/javascript";
          s.async=true;
          s.src=r+"?sdkid="+e+"&lib="+t;

          var x=document.getElementsByTagName("script")[0];
          x.parentNode.insertBefore(s,x);
        };

        ttq.load('D8GE2OJC77U3N4JA967G');
        ttq.page();
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