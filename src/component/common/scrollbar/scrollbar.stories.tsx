import type { Meta, StoryObj } from "@storybook/react"

const meta: Meta = {
	title: "component/common/scrollbar",
}

export default meta

type Story = StoryObj

export const Laboratory: Story = {
	render: () => {
		return (
			<div className="flex h-[85dvh] w-[85dvw] flex-col items-center justify-center gap-10 rounded-[26px] bg-BGblue02 drop-shadow-lg">
				<h1>Scrollbar 실험장</h1>
				<div className="flex h-fit w-fit items-center justify-between gap-20">
					<section className="flex flex-col items-center gap-[10px]">
						<label>custom-scrollbar 미적용</label>
						<label className="text-Caption02">{`className="h-[100px] w-[100px] ....`}</label>
						<div className="h-[100px] w-[100px] overflow-y-auto overflow-x-hidden bg-gray-500 py-2">
							<div className="m-auto h-[100px] w-[50px] bg-orange-500" />
							<div className="m-auto h-[100px] w-[50px] bg-pink-500" />
							<div className="m-auto h-[100px] w-[50px] bg-purple-500" />
						</div>
					</section>
					<section className="flex flex-col items-center gap-[10px]">
						<label>custom-scrollbar 적용</label>
						<label className="text-Caption02">{`className="scrollbar h-[100px] w-[100px] ....`}</label>
						<div className="scrollbar h-[100px] w-[100px] overflow-y-auto overflow-x-hidden bg-gray-500 py-2">
							<div className="m-auto h-[100px] w-[50px] bg-orange-500" />
							<div className="m-auto h-[100px] w-[50px] bg-pink-500" />
							<div className="m-auto h-[100px] w-[50px] bg-purple-500" />
						</div>
					</section>
				</div>
			</div>
		)
	},
}
