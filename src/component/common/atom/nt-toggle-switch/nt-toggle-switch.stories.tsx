import type { Meta, StoryFn } from "@storybook/react"
import React, { useState } from "react"

import type { ToggleSwitchProps } from "."
import ToggleSwitch from "."

const meta: Meta = {
	title: "COMPONENT/common/toggle-switch",
	parameters: {
		layout: "centered",
	},
	component: ToggleSwitch,
	argTypes: {
		checked: {
			control: "boolean",
		},
		onChange: {
			action: "clicked",
		},
	},
}

export default meta

const Template: StoryFn<ToggleSwitchProps> = (args) => {
	const [checked, setChecked] = useState(args.checked)

	const handleChange = () => {
		setChecked(!checked)
		args.onChange()
	}

	return <ToggleSwitch checked={checked} onChange={handleChange} />
}

export const Default = Template.bind({})
Default.args = {
	checked: false,
	onChange: () => {},
}
