import type { Meta, StoryObj } from "@storybook/react"

import { NTButton } from "../atom/nt-button"
import Pagination from "../nt-pagination"
import NTSearchfield from "../nt-searchfield"

import { ModalProvider, useModal } from "./nt-modal.context"

import NTModal, {
	NTModalContent,
	NTModalDivider,
	NTModalFooter,
	NTModalHeader,
} from "."

const meta: Meta<typeof NTModal> = {
	title: "component/common/nt-modal",
	component: NTModal,
	decorators: [
		(Story) => (
			<div className="m-0 flex h-dvh w-dvw items-center justify-center bg-red-300 p-0">
				<ModalProvider>
					<Story />
				</ModalProvider>
			</div>
		),
	],
	argTypes: {
		size: {
			control: "inline-radio",
			options: ["small", "big"],
		},
	},
}
export default meta

type Story = StoryObj<typeof NTModal>

export const SmallModalOnlyHeader: Story = {
	args: {
		size: "small",
		children: <NTModalHeader size="small">Header</NTModalHeader>,
	},
}
export const BigModalOnlyHeader: Story = {
	args: {
		size: "big",
		children: (
			<NTModalHeader size="big" align="left">
				Header
			</NTModalHeader>
		),
	},
}
export const BigModal: Story = {
	args: {
		size: "big",
		children: (
			<div>
				<NTModalHeader align="left" size="big">
					BigModalHeaderNFooter
				</NTModalHeader>
				<NTModalContent className="flex flex-col gap-4 py-4">
					<h2>소제목 1</h2>
					<div className="rounded-xl border-2 border-Gray20 p-2">
						모달 내용 1
					</div>
					<div className="rounded-xl border-2 border-Gray20 p-2">
						모달 내용 2
					</div>
					<NTModalDivider size="small" />
					<h2>소제목 2</h2>
					<div className="rounded-xl border-2 border-Gray20 p-2">
						모달 내용 3
					</div>
					<div className="rounded-xl border-2 border-Gray20 p-2">
						모달 내용 4
					</div>
					<div className="rounded-xl border-2 border-Gray20 p-2">
						모달 내용 5
					</div>

					<NTModalDivider size="small" />

					<h2>소제목 3</h2>
					<input
						className="h-[50px] w-full rounded-xl border-2 border-Gray20 p-2"
						placeholder="마음껏 작성해주세요."
					/>
				</NTModalContent>
				<NTModalFooter>
					<NTButton>Button</NTButton>
				</NTModalFooter>
			</div>
		),
	},
}

export const ClickToSmallModal = () => {
	const { onOpen } = useModal()

	const onClick = () => {
		onOpen({
			size: "small",
			children: (
				<div>
					<NTModalHeader>Header</NTModalHeader>
					<NTModalContent className="flex flex-col gap-4 py-4">
						<NTSearchfield />
						<NTModalDivider size="small" weight="bold" color="dark" />
						<div className="rounded-xl border-2 border-Gray20 p-2">
							모달 내용 1
						</div>
						<div className="rounded-xl border-2 border-Gray20 p-2">
							모달 내용 2
						</div>
						<div className="rounded-xl border-2 border-Gray20 p-2">
							모달 내용 3
						</div>
						<div className="rounded-xl border-2 border-Gray20 p-2">
							모달 내용 4
						</div>

						<NTModalDivider />
						<Pagination totPage={1} curPage={1} perPage={1} />
					</NTModalContent>
				</div>
			),
		})
	}

	return <button onClick={onClick}>누르기!</button>
}
