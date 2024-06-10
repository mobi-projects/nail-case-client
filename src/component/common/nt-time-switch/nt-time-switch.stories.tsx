import type { Meta, StoryFn } from "@storybook/react"
import React from "react"

import type { NTTimeSwitchPT } from "."
import { NTTimeSwitch } from "."

const meta: Meta = {
	title: "COMPONENT/common/nt-time-switch",
	component: NTTimeSwitch,
	parameters: {
		layout: "centered",
	},
	argTypes: {
		variant: {
			control: "inline-radio",
			options: ["active", "inactive"],
		},
		children: {
			control: "text",
		},
	},
}

export default meta

const Template: StoryFn<NTTimeSwitchPT> = (args) => <NTTimeSwitch {...args} />

export const Active = Template.bind({})
Active.args = {
	variant: "active",
	children: "영업시간 동일설정",
}

export const Inactive = Template.bind({})
Inactive.args = {
	variant: "inactive",
	children: "영업시간 동일설정",
}
