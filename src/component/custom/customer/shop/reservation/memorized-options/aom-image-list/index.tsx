import type { Dispatch, SetStateAction } from "react"

import { cn } from "@/config/tailwind"
import { useGetMonthlyArtList } from "@/hook/use-aom"
import { isUndefined } from "@/util/common/type-guard"

import type { TReservationForm } from ".."

import AOMImageSingle from "./aom-image-single"

type AOMImageListPT = {
	isSelectedAOM: boolean
	shopId: number
	clickedId: number
	setClickedId: Dispatch<SetStateAction<number>>
	setReservationForm: Dispatch<SetStateAction<TReservationForm>>
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

	return (
		<div
			className={cn(
				"flex h-fit w-full flex-wrap items-center gap-x-3 transition-all",
				isSelectedAOM ? "h-30" : "h-0",
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
