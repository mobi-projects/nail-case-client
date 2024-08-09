"use client"

import type { Dispatch, SetStateAction } from "react"

import NTIcon from "@/component/common/nt-icon"
import { cn } from "@/config/tailwind"

import {
	getSlideCss,
	isFocusedIdxOverFive,
	isOverFiveImages,
} from "./aom-image-list.util"
import AOMImageSingle from "./aom-image-single"

type AOMImageSectionPT = {
	aomInfoArr: Array<{
		imageUrl: string
		imageId: number
	}>
	focusedIdx: number
	setFocusedIdx: Dispatch<SetStateAction<number>>
}

export default function AOMImageList({
	aomInfoArr,
	focusedIdx,
	setFocusedIdx,
}: AOMImageSectionPT) {
	const slideCss = getSlideCss(focusedIdx)

	const handleNextIcon = () => {
		if (isOverFiveImages(aomInfoArr) && !isFocusedIdxOverFive(focusedIdx))
			setFocusedIdx(5)
	}
	const handlePrevIcon = () => {
		if (isOverFiveImages(aomInfoArr) && isFocusedIdxOverFive(focusedIdx))
			setFocusedIdx(4)
	}

	return (
		<div className="flex h-full items-center gap-x-8">
			<NTIcon
				icon="expandLeft"
				className={cn(
					"h-6 w-6 text-Gray50 transition-all hover:text-Gray80",
					isOverFiveImages(aomInfoArr) && isFocusedIdxOverFive(focusedIdx)
						? "cursor-pointer opacity-100"
						: "cursor-default opacity-0",
				)}
				onClick={handlePrevIcon}
			/>
			<div
				className={cn(
					"relative flex h-full w-[36rem] transform items-center gap-x-5 overflow-x-hidden transition-transform duration-300",
				)}
			>
				<div
					className={cn(
						"absolute top-1/2 flex w-full -translate-y-1/2 transform items-center gap-x-5 transition-transform duration-1000",
						slideCss,
					)}
				>
					{aomInfoArr.map((info, idx) => (
						<AOMImageSingle
							imageUrl={info.imageUrl}
							key={info.imageId}
							isFocused={focusedIdx === idx}
							idx={idx}
							setFocusedIdx={setFocusedIdx}
						/>
					))}
				</div>
			</div>
			<NTIcon
				icon="expandRight"
				className={cn(
					"h-6 w-6 cursor-pointer text-Gray50 transition-all hover:text-Gray80",
					isOverFiveImages(aomInfoArr) && !isFocusedIdxOverFive(focusedIdx)
						? "cursor-pointer opacity-100"
						: "cursor-default opacity-0",
				)}
				onClick={handleNextIcon}
			/>
		</div>
	)
}
