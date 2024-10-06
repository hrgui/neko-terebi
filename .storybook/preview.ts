import type { Preview } from "@storybook/react";
import "../src/app/index.css";

const preview: Preview = {
  initialGlobals: {
    // 👇 Set the initial background color
    backgrounds: { value: "dark" },
  },
  parameters: {
    backgrounds: {
      values: [{ name: "Dark", value: "#000" }],
      default: "Dark",
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
