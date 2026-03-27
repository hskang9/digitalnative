import fs from "node:fs";
import path from "node:path";
import Script from "next/script";

function loadLandingMarkup() {
  const filePath = path.join(process.cwd(), "digital native.html");
  const rawHtml = fs.readFileSync(filePath, "utf8");
  const bodyMatch = rawHtml.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
  let bodyMarkup = bodyMatch ? bodyMatch[1] : rawHtml;

  // Script execution via dangerouslySetInnerHTML is unreliable in React.
  // Keep only markup here and load scripts through next/script below.
  bodyMarkup = bodyMarkup.replace(/<script[\s\S]*?<\/script>/gi, "");
  return bodyMarkup;
}

export default function HomePage() {
  const bodyMarkup = loadLandingMarkup();

  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: bodyMarkup }} />
      <Script src="https://unpkg.com/lucide@latest" strategy="afterInteractive" />
      <Script id="lucide-init" strategy="afterInteractive">
        {`window.lucide?.createIcons();`}
      </Script>
    </>
  );
}
