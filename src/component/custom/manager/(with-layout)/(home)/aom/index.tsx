"use client"
import { useState } from "react"

import { useGetMonthlyArtList } from "@/hook/use-aom"
import { isUndefined } from "@/util/common/type-guard"

import AOMError from "./aom-error"
import AOMImageList from "./aom-image-list-section"
import AOMSkelton from "./aom-skelton"
import ImageViewerdBox from "./image-viewer-box"

type AOMPT = { shopId: number }
export default function AOM({ shopId }: AOMPT) {
	const [foucsedIdx, setFocusedIdx] = useState(0)
	const { data: AOMData, isLoading, isError } = useGetMonthlyArtList(shopId)
	if (isLoading) return <AOMSkelton />
	if (isError || isUndefined(AOMData)) return <AOMError />
	return (
		<div className="grid h-[360px] w-full grid-cols-[380px_auto] rounded-3xl bg-White shadow-customGray80 max-lg:flex max-lg:h-fit max-lg:flex-col max-lg:gap-y-5">
			<ImageViewerdBox aomInfoArr={AOMData.dataList} focusedIdx={foucsedIdx} />
			<AOMImageList
				aomInfoArr={AOMData.dataList}
				focusedIdx={foucsedIdx}
				setFocusedIdx={setFocusedIdx}
			/>
		</div>
	)
}
