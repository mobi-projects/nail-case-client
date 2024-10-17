import { useEffect, type Dispatch, type SetStateAction } from "react"

import { cn } from "@/config/tailwind"
import { useGetMonthlyArtList } from "@/hook/use-aom"
import type { TReqReservationForm } from "@/util/api/post-register-reservation"
import { isUndefined } from "@/util/common/type-guard"

import AOMImageSingle from "./aom-image-single"

type AOMImageListPT = {
	isSelectedAOM: boolean
	shopId: number
	clickedId: number
	setDisabledIdxArr: Dispatch<SetStateAction<Array<number>>>
	setClickedId: Dispatch<SetStateAction<number>>
	setReservationForm: Dispatch<SetStateAction<TReqReservationForm>>
}

export default function AOMImageList({
	isSelectedAOM,
	shopId,
	clickedId,
	setDisabledIdxArr,
	setClickedId,
	setReservationForm,
}: AOMImageListPT) {
	const { data, isLoading } = useGetMonthlyArtList(shopId)

	useEffect(() => {
		if (data?.dataList.length === 0) return setDisabledIdxArr([0, 3])
	}, [setDisabledIdxArr, data])

	if (isLoading || isUndefined(data)) return null
	const delayCss = setTimeout(() => {
		return isSelectedAOM ? "h-30" : "h-0"
	}, 200)
	return (
		<div
			className={cn(
				"flex h-fit w-full flex-wrap items-center gap-x-3 transition-all",
				delayCss,
			)}
		>
			{data.dataList.map((image) => (
				<AOMImageSingle
					isSelectedAOM={isSelectedAOM}
					imageInfo={image}
					key={image.imageId}
					isClicked={clickedId === image.imageId}
					setClickedId={setClickedId}
					setReservationForm={setReservationForm}
				/>
			))}
		</div>
	)
}
