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
			control: "inline-radio",
			options: ["top", "bottom"],
		},
		topStyle: {
			control: "inline-radio",
			options: ["default", "light"],
		},
		bottomTextSize: {
			control: "inline-radio",
			options: ["small", "large"],
		},
		selected: {
			control: "number",
		},
	},
}

export default meta

type Story = StoryObj<typeof NTToolbar>

export const TopDefault: Story = {
	args: {
		position: "top",
		topStyle: "default",
		bottomTextSize: "small",
		selected: 1,
		isSelected: (index: number) => console.log(`Selected index: ${index}`),
		arr: ["Button 1", "Button 2", "Button 3"],
	},
}
