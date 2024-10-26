import type { StoryObj, Meta } from "@storybook/react";
import { LoadingOverlay } from "./LoadingOverlay";
const meta: Meta<typeof LoadingOverlay> = { title: "LoadingOverlay", component: LoadingOverlay };

export default meta;

type Story = StoryObj<typeof LoadingOverlay>;

export const Default: Story = {};
