import type { Meta, StoryObj } from "@storybook/react"
import { useEffect, useState } from "react"

import Slider from "."

const meta: Meta<typeof Slider> = {
	title: "component/common/nt-slider",
	parameters: {
		layout: "centered",
		argTypes: {
			upperLimit: {
				control: {
					type: "number",
					step: 1,
				},
			},
			curValue: {
				control: {
					type: "number",
				},
			},
		},
	},
	component: Slider,
}
export default meta

type Story = StoryObj<typeof Slider>

export const Default: Story = {
	argTypes: {
		upperLimit: {
			control: {
				type: "number",
				step: 1,
			},
		},
		curValue: {
			control: {
				type: "number",
			},
		},
	},
	args: {
		curValue: 1,
		upperLimit: 10,
	},
	render: ({ curValue, upperLimit }) => {
		const [sliderValue, setSliderValue] = useState<number>(curValue)
		const handleSliderChange = (value: number) => {
			setSliderValue(value)
		}
		useEffect(() => {
			setSliderValue(curValue)
		}, [curValue])
		return (
			<div>
				<Slider
					upperLimit={upperLimit}
					curValue={sliderValue}
					onCurValueChange={handleSliderChange}
				/>

				<p>Current slider value: {sliderValue}</p>
			</div>
		)
	},
}

export const Disabled: Story = {
	args: {
		curValue: 1,
		upperLimit: 10,
	},
	render: ({ curValue, upperLimit }) => {
		return <Slider upperLimit={upperLimit} curValue={curValue} disabled />
	},
}
