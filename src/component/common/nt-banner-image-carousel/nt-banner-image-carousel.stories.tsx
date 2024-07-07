import type { Meta, StoryObj } from "@storybook/react"
import { useState } from "react"

import NTBannerImageCarousel from "."

const meta: Meta<typeof NTBannerImageCarousel> = {
	title: "component/common/nt-banner-image-carousel",
	parameters: {
		layout: "centered",
	},
	component: NTBannerImageCarousel,
	argTypes: {
		isInfinity: {
			control: "boolean",
		},
		objectFit: {
			control: "inline-radio",
			options: [
				"object-contain",
				"object-cover",
				"object-fill",
				"object-scale-down",
			],
		},
		className: {
			table: {
				disable: true,
			},
		},
		essentialImagePropArr: {
			table: {
				disable: true,
			},
		},
		accessSelected: {
			table: {
				disable: true,
			},
		},
	},
	args: {
		essentialImagePropArr: [
			{
				src: "https://cdn.pixabay.com/photo/2024/03/04/16/38/cat-8612685_1280.jpg",
				alt: "carousel-test-image",
			},
			{
				src: "https://cdn.pixabay.com/photo/2024/01/16/22/29/dog-8513202_1280.jpg",
				alt: "carousel-test-image",
			},
			{
				src: "https://cdn.pixabay.com/photo/2016/06/14/20/33/elephant-1457450_1280.jpg",
				alt: "carousel-test-image",
			},
			{
				src: "https://cdn.pixabay.com/photo/2024/05/29/07/31/rhino-8795538_1280.jpg",
				alt: "carousel-test-image",
			},
		],
	},
}
export default meta

type Story = StoryObj<typeof NTBannerImageCarousel>

export const Laboratory: Story = {
	render: (args) => {
		const [selectedIdx, setSelectedIdx] = useState(0)
		const getSelectedIdx = (idx: number) => {
			setSelectedIdx(idx)
		}
		return (
			<div className="flex h-[90dvh] w-[85dvw] flex-col items-center justify-center gap-3 rounded-[26px] bg-BGblue02 drop-shadow-lg">
				<h1>NTBannerImageCarousel 실험장</h1>
				<p>패널로 조작 해보세요.!</p>
				<p>
					{selectedIdx + 1} / {args.essentialImagePropArr!.length}
				</p>
				<NTBannerImageCarousel
					{...args}
					className="h-[50%] w-full"
					accessSelected={getSelectedIdx}
				/>
			</div>
		)
	},
}
export const NoImages: Story = {
	render: (args) => {
		return (
			<div className="flex h-[90dvh] w-[85dvw] flex-col items-center justify-center gap-3 rounded-[26px] bg-BGblue02 drop-shadow-lg">
				<h1>NTBannerImageCarousel 실험장</h1>
				<p>이미지 배열이 전달되지 않은 경우,</p>
				<NTBannerImageCarousel
					{...args}
					className="h-[50%] w-full"
					essentialImagePropArr={[]}
				/>
			</div>
		)
	},
}
