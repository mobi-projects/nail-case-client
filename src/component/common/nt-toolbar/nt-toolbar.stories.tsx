import type { Meta, StoryObj } from "@storybook/react"
import { useState } from "react"

import NTToolbar from "."

const meta: Meta<typeof NTToolbar> = {
	title: "component/common/nt-toolbar",
	parameters: {
		layout: "centered",
		hideNoControlsWarning: true,
	},
	component: NTToolbar,
	argTypes: {
		position: {
			control: "inline-radio",
			options: ["top", "bottom"],
		},
		size: {
			control: "inline-radio",
			options: ["small", "large"],
		},
		className: {
			table: {
				disable: true,
			},
		},
		onClickTool: {
			table: {
				disable: true,
			},
		},
		focusedIdx: {
			table: {
				disable: true,
			},
		},
	},
	args: {
		toolList: ["홈", "일정", "채팅", "예약", "내 샵"],
	},
}

export default meta

type Story = StoryObj<typeof NTToolbar>

export const Laboratory: Story = {
	render: (args) => {
		const [focusedIdx, setFocusedIdx] = useState(0)
		const onClickSomeTool = (idx: number) => {
			setFocusedIdx(idx)
		}
		return (
			<div className="flex h-[85dvh] w-[85dvw] flex-col items-center justify-center gap-10 rounded-[26px] bg-BGblue02 drop-shadow-lg">
				<h1>NTToolbar 실험장</h1>
				<p>패널로 조작 해보세요.!</p>
				<NTToolbar
					{...args}
					focusedIdx={focusedIdx}
					onClickTool={onClickSomeTool}
				/>
			</div>
		)
	},
}
