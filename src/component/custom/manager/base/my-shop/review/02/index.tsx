"use client"
import { useState } from "react"

export default function ReviewTitleheader() {
	return (
		<div className="flex h-[50px] w-full items-center justify-between">
			<ReviewTitleList />
			<Manager_Base_MyShop_Review_02_02 />
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
function Manager_Base_MyShop_Review_02_02() {
	return <div className="h-full w-full border-[5px] border-green-300" />
}
