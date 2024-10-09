import asVwPlugin from "./tailwind-lrx-utils/asVwPlugin";

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,vue}",
    "./apps/**/*.{js,ts,jsx,tsx,vue}",
    "./packages/**/*.{js,ts,jsx,tsx,vue}",
  ],
  theme: {
    extend: {},
  },
  plugins: [asVwPlugin({ default: 1920 })],
};
