import Image from "next/image"

import { cn } from "@/config/tailwind"
import type { TResAOM } from "@/util/api-v2/list-monthly-art"

import { hasAOMImages } from "../aom.utils"

type IageUploadBoxPT = {
	aomInfoArr: TResAOM
	focusedIdx: number
}

export default function ImageViewerdBox({
	aomInfoArr,
	focusedIdx,
}: IageUploadBoxPT) {
	return hasAOMImages(aomInfoArr) ? (
		<div
			className={cn(
				"relative flex h-[26rem] w-[22rem] min-w-80 flex-col items-center justify-center gap-y-3 rounded-3xl border-[1.5px] bg-Black text-Gray70",
				hasAOMImages(aomInfoArr) ? "border-transparent" : "border-PB50",
			)}
		>
			<Image
				src={aomInfoArr[focusedIdx].imageUrl}
				alt="이달의 아트"
				fill
				sizes="60vw"
				priority
				className="rounded-3xl"
				style={{ objectFit: "contain" }}
			/>
		</div>
	) : (
		<div className="flex h-[26rem] w-80 items-center justify-center rounded-3xl border-[1.5px] border-black bg-Black text-Gray70">
			<div className="flex h-[20rem] w-full items-center justify-center bg-BGblue01">
				현재 이달의 아트가 없습니다
			</div>
		</div>
	)
}
