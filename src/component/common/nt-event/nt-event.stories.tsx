import type { Meta, StoryFn } from "@storybook/react"
import React from "react"

import type { LabelProps } from "."
import { NTEvent } from "."

const meta: Meta = {
	title: "COMPONENT/common/nt-event",
	parameters: {
		layout: "centered",
	},
	component: NTEvent,
	argTypes: {
		variant: {
			control: "inline-radio",
			options: [
				"primary",
				"secondary",
				"tertiary",
				"quaternary",
				"quinary",
				"senary",
				"septenary",
			],
		},
		children: {
			control: "text",
		},
		className: {
			control: "text",
		},
	},
}

export default meta

const Template: StoryFn<LabelProps> = (args) => <NTEvent {...args} />

export const Primary = Template.bind({})
Primary.args = {
	variant: "primary",
	children: "label",
}

export const Secondary = Template.bind({})
Secondary.args = {
	variant: "secondary",
	children: "label",
}

export const Tertiary = Template.bind({})
Tertiary.args = {
	variant: "tertiary",
	children: "label",
}

export const Quaternary = Template.bind({})
Quaternary.args = {
	variant: "quaternary",
	children: "label",
}

export const Quinary = Template.bind({})
Quinary.args = {
	variant: "quinary",
	children: "label",
}

export const Senary = Template.bind({})
Senary.args = {
	variant: "senary",
	children: "label",
}

export const Septenary = Template.bind({})
Septenary.args = {
	variant: "septenary",
	children: "label",
}
