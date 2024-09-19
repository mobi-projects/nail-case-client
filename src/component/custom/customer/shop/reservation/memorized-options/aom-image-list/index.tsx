import type { Dispatch, SetStateAction } from "react"

import { cn } from "@/config/tailwind"
import { useGetMonthlyArtList } from "@/hook/use-aom"
import type { TReqReservationForm } from "@/util/api-v2/post-register-reservation"
import { isUndefined } from "@/util/common/type-guard"

import AOMImageSingle from "./aom-image-single"

type AOMImageListPT = {
	isSelectedAOM: boolean
	shopId: number
	clickedId: number
	setClickedId: Dispatch<SetStateAction<number>>
	setReservationForm: Dispatch<SetStateAction<TReqReservationForm>>
}

export default function AOMImageList({
	isSelectedAOM,
	shopId,
	clickedId,
	setClickedId,
	setReservationForm,
}: AOMImageListPT) {
	const { data, isLoading } = useGetMonthlyArtList(shopId)
	if (isLoading || isUndefined(data)) return
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
