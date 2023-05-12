/**
 * @type {import('next').NextConfig}
 **/
const nextConfig = {
  i18n: { defaultLocale: "ja", locales: ["ja"] },
  poweredByHeader: false,
  reactStrictMode: true,
  swcMinify: true,
};

export default nextConfig;
