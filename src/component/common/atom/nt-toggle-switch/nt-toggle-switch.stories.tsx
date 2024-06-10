import type { Meta, StoryFn } from "@storybook/react"
import React, { useState, useEffect } from "react"

import type { ToggleSwitchProps } from "."
import ToggleSwitch from "."

const meta: Meta = {
	title: "COMPONENT/common/nt-toggle-switch",
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

	useEffect(() => {
		setChecked(args.checked)
	}, [args.checked])

	return <ToggleSwitch checked={checked} onChange={handleChange} />
}

export const Default = Template.bind({})
Default.args = {
	checked: false,
	onChange: () => {},
}
