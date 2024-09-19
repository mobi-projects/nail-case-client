import Image from "next/image"
import type { Dispatch, SetStateAction } from "react"

import { cn } from "@/config/tailwind"
import type { TAOMImage } from "@/util/api-v2/list-monthly-art"
import type { TReqReservationForm } from "@/util/api-v2/post-register-reservation"

type AOMImageSinglePT = {
	imageInfo: TAOMImage
	isSelectedAOM: boolean
	isClicked: boolean
	setClickedId: Dispatch<SetStateAction<number>>
	setReservationForm: Dispatch<SetStateAction<TReqReservationForm>>
}

export default function AOMImageSingle({
	imageInfo,
	isSelectedAOM,
	isClicked,
	setClickedId,
	setReservationForm,
}: AOMImageSinglePT) {
	const handleClickImage = () => {
		setClickedId((prevId) => {
			if (prevId === imageInfo.imageId) return prevId
			return imageInfo.imageId
		})
		setReservationForm((prev) => ({
			...prev,
			treatment: { option: "AOM", imageId: imageInfo.imageId },
		}))
	}

	return (
		<div
			className={cn(
				"relative w-24 min-w-24 cursor-pointer rounded-md bg-White shadow-customGray80 transition-all",
				isSelectedAOM ? "h-24" : "h-1 opacity-0",
			)}
			onClick={handleClickImage}
		>
			<Image
				alt="이달의 아트"
				src={imageInfo.imageUrl}
				fill
				sizes="30vw"
				priority
				className={cn(
					"rounded-md",
					isSelectedAOM ? "border-[3px]" : "border-none",
					isClicked ? "border-PB80" : "border-transparent",
				)}
			/>
			<ClickedIndicator isSelectedAOM={isSelectedAOM} />
		</div>
	)
}

type ClickedIndicatorPT = {
	isSelectedAOM: boolean
}

function ClickedIndicator({ isSelectedAOM }: ClickedIndicatorPT) {
	return (
		<div
			className={cn(
				"absolute flex w-24 items-center justify-center rounded-md border-2 border-PB50 bg-Gray100/25 font-Bold text-White opacity-0 transition-all",
				isSelectedAOM ? "h-24 hover:opacity-100" : "h-0 cursor-default",
			)}
		>
			선택
		</div>
	)
}
