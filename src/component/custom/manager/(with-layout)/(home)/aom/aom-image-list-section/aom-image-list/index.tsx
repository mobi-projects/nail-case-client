"use client"

import type { Dispatch, SetStateAction } from "react"

import NTIcon from "@/component/common/nt-icon"
import { cn } from "@/config/tailwind"
import type { TResAOM } from "@/util/api/list-monthly-art"

import {
	getSlideCss,
	isArrayLengthOver,
	isFocusedIdxNumberOver,
} from "./aom-image-list.util"
import AOMImageSingle from "./aom-image-single"

type AOMImageSectionPT = {
	aomInfoArr: TResAOM
	focusedIdx: number
	setFocusedIdx: Dispatch<SetStateAction<number>>
}

export default function AOMImageList({
	aomInfoArr,
	focusedIdx,
	setFocusedIdx,
}: AOMImageSectionPT) {
	const slideCss = getSlideCss(focusedIdx)
	const lengthThreshold = 5
	const idxThreshold = lengthThreshold - 1
	const handleNextIcon = () => {
		if (
			isArrayLengthOver(aomInfoArr, lengthThreshold) &&
			!isFocusedIdxNumberOver(focusedIdx, idxThreshold)
		)
			setFocusedIdx(5)
	}
	const handlePrevIcon = () => {
		if (
			isArrayLengthOver(aomInfoArr, lengthThreshold) &&
			isFocusedIdxNumberOver(focusedIdx, idxThreshold)
		)
			setFocusedIdx(4)
	}

	return (
		<>
			<div className="flex h-full items-center justify-center gap-x-4 pr-4 max-lg:hidden">
				<NTIcon
					icon="expandLeft"
					className={cn(
						"h-8 w-8 text-Gray50 transition-all hover:text-Gray80",
						isArrayLengthOver(aomInfoArr, lengthThreshold) &&
							isFocusedIdxNumberOver(focusedIdx, idxThreshold)
							? "cursor-pointer opacity-100"
							: "cursor-default opacity-0",
					)}
					onClick={handlePrevIcon}
				/>
				<div
					className={cn(
						"relative flex h-full w-[40rem] transform items-center gap-x-5 overflow-x-hidden transition-transform duration-300",
					)}
				>
					<div
						className={cn(
							"absolute top-1/2 flex w-full -translate-y-1/2 transform items-center gap-x-4 px-2 transition-transform duration-1000",
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
						"h-8 w-8 cursor-pointer text-Gray50 transition-all hover:text-Gray80",
						isArrayLengthOver(aomInfoArr, lengthThreshold) &&
							!isFocusedIdxNumberOver(focusedIdx, idxThreshold)
							? "cursor-pointer opacity-100"
							: "cursor-default opacity-0",
					)}
					onClick={handleNextIcon}
				/>
			</div>
			<MobileAOMImageList
				aomInfoArr={aomInfoArr}
				focusedIdx={focusedIdx}
				setFocusedIdx={setFocusedIdx}
			/>
		</>
	)
}

type MobileAOMImageListPT = AOMImageSectionPT
function MobileAOMImageList({
	aomInfoArr,
	focusedIdx,
	setFocusedIdx,
}: MobileAOMImageListPT) {
	return (
		<div className="hidden h-full w-full flex-wrap items-center gap-2 max-lg:flex">
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
	)
}
