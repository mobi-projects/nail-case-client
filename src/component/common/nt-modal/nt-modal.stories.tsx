import type { Meta, StoryObj } from "@storybook/react"

import { NTButton } from "../atom/nt-button"

import { ModalProvider, useModal } from "./nt-modal.context"

import NTModal, { ModalBody, ModalContent, ModalFooter, ModalHeader } from "."

const meta: Meta<typeof NTModal> = {
	title: "component/common/nt-modal",
	parameters: {
		layout: "centered",
		hideNoControlsWarning: true,
	},
	component: NTModal,
	argTypes: {
		size: {
			control: "inline-radio",
			options: ["small", "large"],
		},
		isX: {
			control: "boolean",
		},
	},
	args: {
		size: "small",
		isX: false,
	},
	decorators: [
		(Story) => (
			<div className="h-[90dvh] w-[90dvw]">
				<ModalProvider>
					<Story />
				</ModalProvider>
			</div>
		),
	],
}
export default meta

type Story = StoryObj<typeof NTModal>

export const Laboratory: Story = {
	args: {
		isX: true,
	},

	render: (args) => {
		const { onOpenModal } = useModal()

		const onClickButton = () => {
			onOpenModal({
				...args,
				children: <TestModal />,
			})
		}
		return (
			<div className="flex h-[85dvh] w-[85dvw] flex-col items-center justify-center gap-10 rounded-[26px] bg-BGblue02 drop-shadow-lg">
				<h1>NTModal 실험장</h1>
				<p>패널로 조작 해보세요.!</p>
				<NTButton onClick={onClickButton} flexible="fit">
					모달 나옵니다
				</NTButton>
			</div>
		)
	},
}

function TestModal() {
	const { onCloseModal } = useModal()
	return (
		<ModalContent className="flex flex-col gap-3">
			<ModalHeader className="flex flex-col items-center justify-center">
				<h2>[Modal Header]</h2>
			</ModalHeader>
			<ModalBody className="flex flex-col">
				<h3>[Modal Body]</h3>
				<p>내용이 많으면 스크롤 영역이 생성됩니다..</p>
				<br />
				<h3>[Modal Body]</h3>
				<p>내용이 많으면 스크롤 영역이 생성됩니다..</p>
				<br />
				<h3>[Modal Body]</h3>
				<p>내용이 많으면 스크롤 영역이 생성됩니다..</p>
				<br />
				<h3>[Modal Body]</h3>
				<p>내용이 많으면 스크롤 영역이 생성됩니다..</p>
				<br />
				<h3>[Modal Body]</h3>
				<p>내용이 많으면 스크롤 영역이 생성됩니다..</p>
			</ModalBody>
			<ModalFooter className="flex flex-col items-center justify-center">
				<h2>[Modal Footer]</h2>
				<NTButton onClick={onCloseModal}>닫기</NTButton>
			</ModalFooter>
		</ModalContent>
	)
}
