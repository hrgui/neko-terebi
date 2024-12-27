import tailwindcss from "tailwindcss";
import autoprefixer from "autoprefixer";
import { postcssVarReplace } from "postcss-var-replace";

/*
 tailwindcss: {},
    autoprefixer: {},
    "postcss-var-replace": {},
    */

export default {
  plugins: [tailwindcss(), autoprefixer(), postcssVarReplace({ preserveAtRulesOrder: true })],
};
