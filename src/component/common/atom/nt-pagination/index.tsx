"use client"

import type { VariantProps } from "class-variance-authority"
import { cva } from "class-variance-authority"
import Link from "next/link"
import { usePathname, useSearchParams } from "next/navigation"
import { type ButtonHTMLAttributes, type PropsWithChildren } from "react"

const MAX_BUTTON_NUMBER = 5

type NTPaginationPT = {
	totalPage: number
}
type ArrowButtonPT = {
	direction: "left" | "right"
	curPage: number
}
type PageButtonPT = ButtonHTMLAttributes<HTMLButtonElement> &
	PropsWithChildren &
	VariantProps<typeof PageButtonVariants>

const PageButtonVariants = cva(
	"flex h-[30px] w-[31px] items-center justify-center rounded-[3px] text-Body02 text-Gray30 bg-transparent",
	{
		variants: {
			isActive: {
				true: "text-white bg-PB100",
			},
		},
		defaultVariants: {
			isActive: false,
		},
	},
)

export default function NTPagination({ totalPage }: NTPaginationPT) {
	const params = useSearchParams()
	const curPage = parseInt(params.get("curPage") ?? "1") as number
	const frontNumber = getFrontNumber(curPage)
	const backNumber = getBackNumber(frontNumber)
	const pages = new Array(MAX_BUTTON_NUMBER).fill(frontNumber)

	return (
		<div className="align-center flex h-fit w-full justify-center gap-[2px]">
			{isPrintingLeftArrow(frontNumber) && (
				<ArrowButton direction="left" curPage={curPage} />
			)}

			{pages.map((_, idx) => {
				const page = frontNumber + idx
				if (page > totalPage) return
				return (
					<PageButton key={idx} isActive={page == curPage}>
						{page}
					</PageButton>
				)
			})}

			{isPrintingRightArrow(backNumber, totalPage) && (
				<ArrowButton direction="right" curPage={curPage} />
			)}
		</div>
	)
}
NTPagination.displayName = "NTPagination"

function PageButton({ children: page, isActive }: PageButtonPT) {
	const pathname = usePathname()
	return (
		<Link
			className={PageButtonVariants({ isActive })}
			href={{
				pathname,
				query: { curPage: page as string },
			}}
		>
			{page}
		</Link>
	)
}
function ArrowButton({ direction, curPage }: ArrowButtonPT) {
	const arrow = isLeftArrow(direction) ? "＜" : "＞"
	const to = isLeftArrow(direction) ? curPage - 1 : curPage + 1
	return (
		<Link
			className={PageButtonVariants()}
			href={{
				query: { curPage: to.toString() },
			}}
		>
			{arrow}
		</Link>
	)
}

const getFrontNumber = (curPage: number) =>
	Math.floor((curPage - 1) / MAX_BUTTON_NUMBER) * MAX_BUTTON_NUMBER + 1
const getBackNumber = (frontNumber: number) =>
	frontNumber + MAX_BUTTON_NUMBER - 1
const isPrintingLeftArrow = (frontNumber: number) =>
	frontNumber !== 1 && frontNumber % MAX_BUTTON_NUMBER == 1
const isPrintingRightArrow = (backNumber: number, totalPage: number) =>
	backNumber < totalPage
const isLeftArrow = (directtion: "left" | "right") => directtion === "left"
