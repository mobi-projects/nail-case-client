"use client"
import { useState } from "react"

import NTPulldown from "@/component/common/nt-pulldown"
import { usePulldown } from "@/hook/use-component"

export default function ReviewTitleheader() {
	return (
		<div className="flex h-[50px] w-full items-center justify-between">
			<ReviewTitleList />
			<ReviewPulldownList />
		</div>
	)
}
function ReviewTitleList() {
	const reviewTitle = ["전체", "최신순", "사진리뷰"]
	const [selectedIdx, setSelectedIdx] = useState(0)

	const handleClick = (idx: number) => {
		setSelectedIdx(idx)
	}

	return (
		<div className="flex w-full gap-[18px] text-Gray50">
			{reviewTitle.map((item, idx) => (
				<div
					className={`cursor-pointer text-Title03 font-SemiBold ${selectedIdx === idx ? "text-PB100" : "text-Gray50"}`}
					key={idx}
					onClick={() => handleClick(idx)}
				>
					{item}
				</div>
			))}
		</div>
	)
}
function ReviewPulldownList() {
	const pulldownStarRate = usePulldown()
	const pulldownFillter = usePulldown()

	return (
		<div className="flex h-[44px] w-full justify-end gap-[20px]">
			<NTPulldown
				{...pulldownStarRate}
				optionArr={["제목", "태그"]}
				placeholder="별점"
				description="선택해주세요"
			/>
			<NTPulldown
				{...pulldownFillter}
				optionArr={["5점", "4점", "3점", "2점", "1점"]}
				placeholder="필터"
				description="선택해주세요"
			/>
		</div>
	)
}
