import type { Meta, StoryObj } from "@storybook/react"
import { useState } from "react"

import NTOption from "."

const meta: Meta<typeof NTOption> = {
	title: "component/common/nt-option",
	parameters: {
		layout: "centered",
	},
	component: NTOption,
	argTypes: {
		size: {
			control: "inline-radio",
			options: ["medium", "large"],
		},
		optionArr: {
			table: {
				disable: true,
			},
		},
		disabledIdxArr: {
			table: {
				disable: true,
			},
		},
		className: {
			table: {
				disable: true,
			},
		},
		onSelect: {
			table: {
				disable: true,
			},
		},
		selectedIdxArr: {
			table: {
				disable: true,
			},
		},
	},
}

export default meta

type Story = StoryObj<typeof NTOption>

export const Laboratory: Story = {
	render: (args) => {
		const [selectedIdxArr, setSelectedIdxArr] = useState<number[]>([])
		const onClickOption = (idx: number) => {
			if (selectedIdxArr.includes(idx))
				setSelectedIdxArr((prev) =>
					prev.filter((selectedIdx) => selectedIdx !== idx),
				)
			else setSelectedIdxArr((prev) => [...prev, idx])
		}
		return (
			<div className="flex h-[85dvh] w-[85dvw] flex-col items-center justify-center gap-10 rounded-[26px] bg-red-200 drop-shadow-lg">
				<h1>NTOption 실험장</h1>
				<p>패널로 조작 해보세요.!</p>
				<NTOption
					{...args}
					optionArr={["Option 1", "Option 2", "Option 3", "Option 4"]}
					{...{ selectedIdxArr }}
					onSelect={onClickOption}
				/>
			</div>
		)
	},
}

export const DisabledTesting: Story = {
	render: (args) => {
		const [selectedIdxArr, setSelectedIdxArr] = useState<number[]>([])
		const onClickOption = (idx: number) => {
			if (selectedIdxArr.includes(idx))
				setSelectedIdxArr((prev) =>
					prev.filter((selectedIdx) => selectedIdx !== idx),
				)
			else setSelectedIdxArr((prev) => [...prev, idx])
		}
		return (
			<div className="flex h-[85dvh] w-[85dvw] flex-col items-center justify-center gap-10 rounded-[26px] bg-red-200 drop-shadow-lg">
				<h1>Disabled 실험장</h1>
				<p>3,4 번째 옵션은 disabled 상태입니다.</p>
				<NTOption
					{...args}
					optionArr={["Option 1", "Option 2", "Option 3", "Option 4"]}
					{...{ selectedIdxArr }}
					disabledIdxArr={[2, 3]}
					onSelect={onClickOption}
				/>
			</div>
		)
	},
}
