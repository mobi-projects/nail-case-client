import type { Dispatch, SetStateAction } from "react"

import { NTButton } from "@/component/common/atom/nt-button"

import { hasAOMImages } from "../aom.utils"

import AOMImageList from "./aom-image-list"

type AOMImageListPT = {
	aomInfoArr: Array<{
		imageUrl: string
		imageId: number
	}>
	focusedIdx: number
	setFocusedIdx: Dispatch<SetStateAction<number>>
}

export default function AOMImageListSection({
	aomInfoArr,
	focusedIdx,
	setFocusedIdx,
}: AOMImageListPT) {
	return hasAOMImages(aomInfoArr) ? (
		<div className="flex h-full w-full flex-col gap-y-2 border-l-2 border-l-Gray20 pl-8">
			<p className="text-Title03 font-SemiBold">등록된 사진</p>
			<p className="text-Title03 font-SemiBold text-PB100">{`${aomInfoArr.length}개`}</p>
			<AOMImageList
				aomInfoArr={aomInfoArr}
				focusedIdx={focusedIdx}
				setFocusedIdx={setFocusedIdx}
			/>

			<NTButton flexible={"fit"} size={"exSmall"}>
				편집하기
			</NTButton>
		</div>
	) : (
		<div className="flex h-full w-full flex-col items-center justify-center gap-y-3 rounded-3xl bg-White shadow-customGray80">
			<p className="text-Title02 font-SemiBold text-Gray70">
				등록된 이달의 아트가 없어요.
			</p>
			<p className="text-Body02 text-Gray50">
				<span className="text-PB60">이달의 아트 등록</span> 버튼을 클릭해서
				사진을 등록해 주세요.
			</p>
		</div>
	)
}
