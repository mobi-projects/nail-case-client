import type { Meta, StoryObj } from "@storybook/react"

import NTToolbar from "."

const meta: Meta<typeof NTToolbar> = {
	title: "component/common/atom/nt-toolbar",
	parameters: {
		layout: "centered",
	},
	component: NTToolbar,
	argTypes: {
		position: {
			control: false,
		},
		topStyle: {
			control: false,
		},
		bottomTextSize: {
			control: false,
		},
		active: {
			control: "boolean",
		},
		onClick: { action: "clicked" },
	},
}

export default meta

type Story = StoryObj<typeof NTToolbar>

export const TopDefault: Story = {
	args: {
		position: "top",
		topStyle: "default",
		active: true,
		children: 1,
	},
}

export const TopLight: Story = {
	args: {
		position: "top",
		topStyle: "light",
		active: true,
		children: 2,
	},
}

export const BottomSmall: Story = {
	args: {
		position: "bottom",
		bottomTextSize: "small",
		active: false,
		children: 3,
	},
}

export const BottomLarge: Story = {
	args: {
		position: "top",
		bottomTextSize: "small",
		active: true,
		topStyle: "default",
		children: 4,
	},
}
