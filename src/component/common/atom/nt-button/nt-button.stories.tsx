import type { Meta, StoryObj } from "@storybook/react"

import { ICON_DATA } from "../../nt-icon"

import { NTButton } from "."

const meta: Meta<typeof NTButton> = {
	title: "component/common/nt-button",
	parameters: {
		layout: "centered",
	},
	component: NTButton,
	argTypes: {
		variant: {
			control: "inline-radio",
			options: ["primary", "secondary", "tertiary"],
		},
		size: {
			control: "inline-radio",
			options: ["large", "medium", "small"],
		},
		disabled: {
			control: "boolean",
		},
		children: {
			control: "text",
		},
		icon: {
			control: "inline-radio",
			options: [undefined, ...Object.keys(ICON_DATA)],
		},
	},
}

export default meta

type Story = StoryObj<typeof NTButton>

export const Primary: Story = {
	args: {
		variant: "primary",
		size: "large",
		children: "Button",
		icon: "check",
	},
}

export const Secondary: Story = {
	args: {
		variant: "secondary",
		size: "medium",
		children: "Button",
		icon: "check",
	},
}

export const Tertiary: Story = {
	args: {
		variant: "tertiary",
		size: "small",
		children: "Button",
		icon: "check",
	},
}
