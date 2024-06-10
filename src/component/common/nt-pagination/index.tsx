import { cva } from "class-variance-authority"

import NTIcon from "../nt-icon"

import {
	getBack,
	getFront,
	getNextFront,
	getPages,
	getPrevBack,
	isLeftArrow,
	isRightArrow,
} from "./nt-pagination.utils"

type NTPaginationPT = {
	curPage: number
	perPage: number
	totPage: number
	onChangePage?: (nxtPage: number) => void
}

export default function Pagination({
	curPage,
	perPage,
	totPage,
	onChangePage,
}: NTPaginationPT) {
	const front = getFront(curPage, perPage)
	const back = getBack(front, perPage, totPage)
	const pageArr = getPages(front, back)

	return (
		<div className="align-center flex h-fit w-full justify-center gap-[2px]">
			{isLeftArrow(pageArr) && (
				<LeftArrow {...{ curPage, onChangePage, perPage }} />
			)}
			<PageButtonList {...{ totPage, pageArr, curPage, onChangePage }} />
			{isRightArrow(pageArr, totPage) && (
				<RightArrow {...{ curPage, onChangePage, perPage }} />
			)}
		</div>
	)
}
const PaginationButtonVariants = cva(
	"flex h-[30px] w-[31px] items-center justify-center rounded-[3px] text-Body02",
	{
		variants: {
			isActive: {
				true: "text-white bg-PB100",
				false: "bg-transparent text-Gray30",
			},
		},
		defaultVariants: {
			isActive: false,
		},
	},
)
type PageButtonListPT = Pick<NTPaginationPT, "curPage" | "onChangePage"> & {
	pageArr: number[]
}
function PageButtonList({ pageArr, curPage, onChangePage }: PageButtonListPT) {
	return (
		<>
			{pageArr.map((page) => {
				return (
					<button
						key={page}
						className={PaginationButtonVariants({ isActive: page === curPage })}
						onClick={() => {
							onChangePage && onChangePage(page)
						}}
					>
						{page}
					</button>
				)
			})}
		</>
	)
}

type ArrowPT = Pick<NTPaginationPT, "curPage" | "onChangePage" | "perPage">
function LeftArrow({ curPage, perPage, onChangePage }: ArrowPT) {
	return (
		<button
			className={PaginationButtonVariants()}
			onClick={() => {
				const prevBack = getPrevBack(curPage, perPage)
				onChangePage && onChangePage(prevBack)
			}}
		>
			<NTIcon icon="expandLeftLight" />
		</button>
	)
}
function RightArrow({ curPage, perPage, onChangePage }: ArrowPT) {
	return (
		<button
			className={PaginationButtonVariants()}
			onClick={() => {
				const nextFront = getNextFront(curPage, perPage)
				onChangePage && onChangePage(nextFront)
			}}
		>
			<NTIcon icon="expandRightLight" />
		</button>
	)
}
