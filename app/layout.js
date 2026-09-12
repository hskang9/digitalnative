import "./globals.css";
import "./experience.css";

export const metadata = {
  title: "Digital Native — AI-native software development firm",
  description:
    "Thoughtfully engineered software, from the first idea to the everyday. An independent practice building and operating AI-native products. Subscriptions from $5,000/month.",
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml", sizes: "any" }],
    shortcut: "/favicon.svg",
  },
  openGraph: {
    title: "Digital Native — AI-native software development firm",
    description:
      "An independent practice building and operating AI-native products. Thoughtfully engineered software, from $5,000/month.",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
};

/**
 * Picks the locale before first paint, so a Korean visitor never sees a
 * frame of English. Both languages are in the markup; CSS hides the one
 * that is not `data-locale`, which means this works with no hydration
 * and no re-render.
 *
 * Order: an explicit choice the visitor already made, then the device —
 * a Seoul clock or a Korean language preference.
 */
const LOCALE_BOOT = `(function(){try{
var d=document.documentElement,k="dn-locale",saved=null;
try{saved=localStorage.getItem(k)}catch(e){}
var l=(saved==="ko"||saved==="en")?saved:null;
if(!l){
var tz="";try{tz=Intl.DateTimeFormat().resolvedOptions().timeZone||""}catch(e){}
var ko=(tz==="Asia/Seoul");
var langs=navigator.languages||[navigator.language||""];
for(var i=0;i<langs.length&&!ko;i++){
if(String(langs[i]).toLowerCase().indexOf("ko")===0)ko=true}
l=ko?"ko":"en"}
d.setAttribute("data-locale",l);d.lang=l}catch(e){}})();`;

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-locale="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: LOCALE_BOOT }} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700&family=Cormorant+Garamond:ital,wght@0,400;0,500;1,400;1,500&family=IBM+Plex+Mono:wght@400;500&family=Noto+Sans+KR:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
        <noscript>
          {/* Without JS the reveal observer never runs — show everything. */}
          <style>{`[data-reveal]{opacity:1!important;transform:none!important}`}</style>
        </noscript>
      </head>
      <body>{children}</body>
    </html>
  );
}
