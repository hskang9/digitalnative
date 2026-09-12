/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  images: { unoptimized: true },
  // Keep the development badge from covering the mobile Garden control.
  devIndicators: false,
};

export default nextConfig;
