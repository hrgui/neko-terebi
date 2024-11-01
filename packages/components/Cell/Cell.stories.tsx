import type { StoryObj, Meta } from "@storybook/react";
import Cell from "./Cell";
const meta: Meta<typeof Cell> = { title: "Cell", component: Cell };

export default meta;

type Story = StoryObj<typeof Cell>;

export const Default: Story = {};
