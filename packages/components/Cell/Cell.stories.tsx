import type { StoryObj, Meta } from "@storybook/react";
import Cell from "./Cell";
const meta: Meta<typeof Cell> = { title: "Cell", component: Cell };

export default meta;

type Story = StoryObj<typeof Cell>;

export const Default: Story = {};

export const BocchiTheRock: Story = {
  args: {
    imageUrl: "https://imgsrv.crunchyroll.com/cdn-cgi/image/fit=contain,format=auto,quality=85,width=1200,height=675/catalog/crunchyroll/88fbe563405097ee6eeeccd9d46195e2.jpg",
    header1: "BOCCHI THE ROCK!",
    header2: "Sub | Dub",
    header3: "14+"
  }
};
