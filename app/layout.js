import "./globals.css";

export const metadata = {
  title: "Digital Native — software development firm",
  description:
    "Digital Native is a registered software development firm. We build and operate consumer AI products — Imagine, an AI image and video app, and JobClaw, an AI portfolio for developers — and take on select client work.",
  icons: {
    icon: [{ url: "/favicon.png", type: "image/png" }],
  },
  openGraph: {
    title: "Digital Native — software development firm",
    description:
      "We build and operate consumer AI products: Imagine (AI image & video) and JobClaw (AI developer portfolios).",
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
    <html lang="en" data-locale="en">
      <head>
        <script dangerouslySetInnerHTML={{ __html: LOCALE_BOOT }} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        {/*
          Archivo Black + JetBrains Mono carry Latin; Black Han Sans and
          Nanum Gothic Coding pick up Hangul per glyph. Google serves these
          as unicode-range subsets, so an English visitor downloads none of
          the Korean faces.
        */}
        <link
          href="https://fonts.googleapis.com/css2?family=Archivo+Black&family=Black+Han+Sans&family=JetBrains+Mono:wght@400;500;700&family=Nanum+Gothic+Coding:wght@400;700&display=swap"
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
