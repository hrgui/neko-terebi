import plugin from "tailwindcss/plugin";
import { pxToVw } from "./pxToVw";

export default plugin.withOptions(function (options = {}) {
  return function ({ addVariant, theme }) {
    for (const [key, viewport] of Object.entries(options)) {
      const screen = theme("screens", {})[key]?.replace("px", "");
      const prefix = screen ? key : "";
      addVariant(`${prefix}@asvw`, ({ container }) => {
        container.walkRules((rule) => {
          rule.walkDecls((decl) => {
            if (decl.value.includes("px")) {
              decl.value = `${pxToVw(decl.value.split("px")[0], viewport)}`;
            }
          });
        });
        if (screen) return `@media (min-width: ${screen}px)`;
      });
    }
  };
});
