import type { Meta, StoryObj } from "@storybook/react"

import { NTButton } from "../atom/nt-button"

import { SheetProvider, useSheet } from "./nt-sheet.context"

import NTSheet from "."

const meta: Meta<typeof NTSheet> = {
	title: "component/common/nt-sheet",
	parameters: {
		layout: "centered",
		hideNoControlsWarning: true,
	},
	component: NTSheet,
	argTypes: {
		children: {
			type: "string",
			control: "text",
		},
		className: {
			table: {
				disable: true,
			},
		},
		key: {
			table: {
				disable: true,
			},
		},
	},
	decorators: [
		(Story) => (
			<div className="h-[90dvh] w-[90dvw]">
				<SheetProvider>
					<Story />
				</SheetProvider>
			</div>
		),
	],
}
export default meta

type Story = StoryObj<typeof NTSheet>

export const Laboratory: Story = {
	render: () => {
		const { onOpenSheet } = useSheet()
		const onClickButton = () => {
			onOpenSheet({
				children: <ExampleSheetContent />,
			})
		}
		return (
			<div className="flex h-[85dvh] w-[85dvw] flex-col items-center justify-center gap-10 rounded-[26px] bg-BGblue02 drop-shadow-lg">
				<h1>NTSheet 실험장</h1>
				<p>패널로 조작 해보세요.!</p>
				<NTButton onClick={onClickButton} flexible="fit">
					Sheet 나옵니다.
				</NTButton>
			</div>
		)
	},
}
function ExampleSheetContent() {
	const { onCloseSheet } = useSheet()
	return (
		<div className="flex h-full w-full flex-col items-center justify-around">
			<h1>Sheet 나왔습니다.</h1>
			<br />
			<p>
				<strong>Blur 된 영역</strong>이나 <strong>아래 버튼</strong> 클릭시
			</p>
			<p>Sheet 를 닫습니다.</p>
			<br />
			<NTButton
				flexible="fit"
				onClick={() => {
					onCloseSheet()
				}}
			>
				Sheet 사라집니다.
			</NTButton>
		</div>
	)
}
