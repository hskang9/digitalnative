/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static HTML export → build writes to `out/`. Vercel can deploy that folder and
  // vercel.json#outputDirectory overrides a wrongly set dashboard "public" output.
  output: "export",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
