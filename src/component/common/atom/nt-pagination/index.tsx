"use client"

import { cva } from "class-variance-authority"
import type { Dispatch, SetStateAction } from "react"

type NTPaginationPT = {
	totPage: number
	perPage: number
	curPage: number
	pageArr: number[]
	isFirstPages: boolean
	isLastPages: boolean
	setCurPage: Dispatch<SetStateAction<number>>
}
/**
 * @param totPage 전체 페이지 수
 * @param curPage 현재 페이지
 * @param pageArr 페이지 번호 배열
 * @param isFirstPages pageArr 에 첫 페이지가 포함되어있는지 여부
 * @param isLastPages pageArr 에 마지막 페이지가 포함되어있는지 여부
 * @param setCurPage 클릭한 페이지 번호를 입력받아, 페이지를 이동하는 상태변경함수
 */
export default function NTPagination({
	totPage,
	perPage,
	curPage,
	pageArr,
	isFirstPages,
	isLastPages,
	setCurPage,
}: NTPaginationPT) {
	return (
		<div className="align-center flex h-fit w-full justify-center gap-[2px]">
			{!isFirstPages && <LeftArrow {...{ curPage, setCurPage, perPage }} />}
			<PageButtonList {...{ totPage, pageArr, curPage, setCurPage }} />
			{!isLastPages && <RightArrow {...{ curPage, setCurPage, perPage }} />}
		</div>
	)
}
NTPagination.displayName = "NTPagination"

type PageButtonListPT = Pick<
	NTPaginationPT,
	"curPage" | "pageArr" | "setCurPage"
>
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
function PageButtonList({ pageArr, curPage, setCurPage }: PageButtonListPT) {
	return (
		<>
			{pageArr.map((page) => {
				return (
					<button
						key={page}
						className={PaginationButtonVariants({ isActive: page === curPage })}
						onClick={() => {
							setCurPage(page)
						}}
					>
						{page}
					</button>
				)
			})}
		</>
	)
}

type ArrowPT = Pick<NTPaginationPT, "curPage" | "setCurPage" | "perPage">
function LeftArrow({ curPage, perPage, setCurPage }: ArrowPT) {
	return (
		<button
			className={PaginationButtonVariants()}
			onClick={() => {
				const nextBack = Math.floor((curPage - 1) / perPage) * perPage
				setCurPage(nextBack)
			}}
		>
			＜
		</button>
	)
}
function RightArrow({ curPage, perPage, setCurPage }: ArrowPT) {
	return (
		<button
			className={PaginationButtonVariants()}
			onClick={() => {
				const nextFront = Math.floor((curPage - 1) / perPage + 1) * perPage + 1
				setCurPage(nextFront)
			}}
		>
			＞
		</button>
	)
}
