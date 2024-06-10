import type { Meta, StoryObj } from "@storybook/react"
import { useState } from "react"

import Pagination from "."

const meta: Meta<typeof Pagination> = {
	title: "component/common/nt-pagination",
	parameters: {
		layout: "centered",
	},
}
export default meta

type Story = StoryObj<typeof Pagination>

export const Default: Story = {
	argTypes: {
		totPage: {
			control: {
				type: "number",
			},
		},
		perPage: {
			control: {
				type: "number",
			},
		},
	},
	args: {
		totPage: 3,
		perPage: 5,
	},
	render: ({ totPage, perPage }) => {
		const [curPage, setCurPage] = useState(1)
		const onChangePage = (nxtPage: number) => {
			setCurPage(nxtPage)
		}
		return <Pagination {...{ curPage, perPage, totPage, onChangePage }} />
	},
}
