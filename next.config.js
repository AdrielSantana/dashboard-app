/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  // async rewrites() {
  //   return [
  //     {
  //       source: "/",
  //       destination: "/dashboard",
  //     },
  //   ];
  // },
};

module.exports = nextConfig;
