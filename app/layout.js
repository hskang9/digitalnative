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

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Archivo+Black&family=JetBrains+Mono:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
