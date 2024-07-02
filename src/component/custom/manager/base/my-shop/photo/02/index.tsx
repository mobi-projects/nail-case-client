"use client"
import { useState } from "react"

import NTOption from "@/component/common/nt-option"

export default function PreviewImages() {
	return (
		<div className="flex h-fit flex-col">
			<PreviewController />
			<PreviewImageList />
		</div>
	)
}

function PreviewController() {
	const [activeIdx, setActiveIdx] = useState(0)
	const onToggleOption = (idx: number) => setActiveIdx(idx)

	return (
		<div className="flex h-[96px] items-center justify-between pr-7">
			<NTOption
				optionArr={["업체 사진", "이용자 사진"]}
				selectedIdxArr={[activeIdx]}
				onSelect={onToggleOption}
			/>
			<span className="pt-6 text-Body02 font-SemiBold text-Gray30">
				전체보기
			</span>
		</div>
	)
}

function PreviewImageList() {
	return (
		<div className="flex h-full w-full gap-x-4 overflow-x-scroll pb-10">
			<PreviewImageBox />
			<PreviewImageBox />
			<PreviewImageBox />
			<PreviewImageBox />
			<PreviewImageBox />
			<PreviewImageBox />
		</div>
	)
}

function PreviewImageBox() {
	return (
		<div className="h-[384px] min-w-[384px] rounded-[26px] bg-White drop-shadow-[2.99px_2.99px_13px_rgba(224,224,224,0.8)]" />
	)
}
