"use client"
import { useState } from "react"

import NTContent from "@/component/common/nt-content"
import NTIcon from "@/component/common/nt-icon"

export default function CardSlideListForm() {
	const dataList = Array.from({ length: 24 }, (_, index) => index + 1)
	const [currentIndex, setCurrentIndex] = useState(dataList.length - 1)

	const handlePrevious = () => {
		setCurrentIndex((prevIndex) =>
			prevIndex > 0 ? prevIndex - 1 : dataList.length - 1,
		)
	}

	const handleNext = () => {
		setCurrentIndex((prevIndex) =>
			prevIndex < dataList.length - 1 ? prevIndex + 1 : 0,
		)
	}

	const orderedDataList = [
		dataList[currentIndex],
		dataList[(currentIndex + 1) % dataList.length],
		dataList[(currentIndex + 2) % dataList.length],
		dataList[(currentIndex + 3) % dataList.length],
	]
	return (
		<div className="h-[428px] w-full">
			<div className="relative h-full w-full">
				<NTContent mode="day" className="absolute right-[20px] top-[57px] z-10">
					{`${((currentIndex + 2) % dataList.length) + 1}/${dataList.length}`}
				</NTContent>
			</div>
			<div className="absolute left-0 top-[163px] z-0 flex h-[397.5px] w-full justify-center overflow-hidden bg-BGblue01 py-[37px]">
				<div className="flex space-x-4">
					{orderedDataList.map((idx) => (
						<CardSlide
							idx={idx}
							key={idx}
							handlePrevious={handlePrevious}
							handleNext={handleNext}
						/>
					))}
				</div>
			</div>
		</div>
	)
}
type CardSlidePT = {
	idx: number
	handlePrevious: () => void
	handleNext: () => void
}
function CardSlide({ idx, handlePrevious, handleNext }: CardSlidePT) {
	return (
		<div className="h-[318px] min-w-[588px] rounded-[26px] bg-gradient-to-r from-PB100 to-White">
			<div className="flex h-full w-full items-center justify-between px-[20px]">
				<div
					className="flex h-[42px] w-[42px] items-center justify-center rounded-full bg-White"
					onClick={handlePrevious}
				>
					<NTIcon icon="expandLeftLight" className="h-[28px] w-[28px]" />
				</div>
				{idx}
				<div
					className="flex h-[42px] w-[42px] items-center justify-center rounded-full bg-White"
					onClick={handleNext}
				>
					<NTIcon icon="expandRightLight" className="h-[28px] w-[28px]" />
				</div>
			</div>
		</div>
	)
}
