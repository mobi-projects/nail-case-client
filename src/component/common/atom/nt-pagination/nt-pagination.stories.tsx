import type { Meta, StoryObj } from "@storybook/react"
import { useState } from "react"

import NTPagination from "."

const meta: Meta<typeof NTPagination> = {
	title: "component/common/atom/nt-pagination",
	parameters: {
		layout: "centered",
		controls: {
			exclude: [
				"pageArr",
				"curPage",
				"setCurPage",
				"isFirstPages",
				"isLastPages",
				"perPage",
			],
		},
	},
	component: NTPagination,
	argTypes: {
		totPage: {
			control: {
				type: "number",
			},
		},
	},
	args: {
		totPage: 3,
	},
}

export default meta

type Story = StoryObj<typeof NTPagination>

export const Default: Story = {
	render: (args) => {
		const [curPage, setCurPage] = useState<number>(args.curPage ?? 1)

		let { totPage } = args
		if (!!!totPage) totPage = 1
		const perPage = 5

		const frontNumber = getFrontNumber(curPage, perPage)
		const backNumber = getBackNumber(frontNumber, perPage, totPage)
		const pageArr = getPages(frontNumber, backNumber)
		const firstPage = 1
		const lastPage = totPage

		return (
			<NTPagination
				{...{ pageArr, perPage, curPage, totPage, setCurPage }}
				isFirstPages={pageArr.includes(firstPage)}
				isLastPages={pageArr.includes(lastPage)}
			/>
		)
	},
}
const getFrontNumber = (curPage: number, perPage: number) =>
	Math.floor((curPage - 1) / perPage) * perPage + 1

const getBackNumber = (frontNumber: number, perPage: number, totPage: number) =>
	Math.min(frontNumber + perPage - 1, totPage)

const getPages = (frontNumber: number, backNumber: number) =>
	new Array(backNumber - frontNumber + 1)
		.fill(frontNumber)
		.map((page, idx) => page + idx)
