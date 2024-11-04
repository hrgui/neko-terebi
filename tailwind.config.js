import asVwPlugin from "./tailwind-lrx-utils/asVwPlugin";
import { pxToVw } from "./tailwind-lrx-utils/pxToVw";
import colors from "tailwindcss/colors";

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,vue}",
    "./apps/**/*.{js,ts,jsx,tsx,vue}",
    "./packages/**/*.{js,ts,jsx,tsx,vue}",
  ],
  theme: {
    fontFamily: {
      sans: ['"Noto Sans"', "sans-serif"],
    },
    colors: {
      // for black and white, we dont do an override on the opacity because we want to have opacity
      black: "#000000",
      white: "#ffffff",
      primary: "#3b82f6",
      gray: colors.gray,
    },
    extend: {
      backgroundImage: {
        "black-fade": "linear-gradient(to right, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0) 95%)",
      },
      boxShadow: {
        "outline-cell": "0 0 0 0.5208333333333333vw #fff",
      },
      fontSize: {
        "headline-xl": [pxToVw(64), pxToVw(72)],
        "headline-l": [pxToVw(56), pxToVw(72)],
        "headline-m": [pxToVw(48), pxToVw(56)],
        "headline-s": [pxToVw(40), pxToVw(48)],
        cta: [pxToVw(32), pxToVw(40)],
        "body-xl": [pxToVw(28), pxToVw(40)],
        "body-l": [pxToVw(24), pxToVw(40)],
        "body-m": [pxToVw(24), pxToVw(28)],
        "body-s": [pxToVw(20), pxToVw(32)],
      },
    },
  },
  plugins: [asVwPlugin({ default: 1920 })],
};
