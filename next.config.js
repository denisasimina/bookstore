/** @type {import('next').NextConfig} */
const path = require("path");

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,

  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
    prependData: `@import "base.scss";`, // Observați că folosim ghilimele duble sau simple, fără puncte după `@import`
  },
};

module.exports = nextConfig;
