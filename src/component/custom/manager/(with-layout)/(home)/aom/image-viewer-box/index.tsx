import { cn } from "@/config/tailwind"
import type { TResAOM } from "@/util/api/list-monthly-art"

import { hasAOMImages } from "../aom.utils"

import RegisterBox from "./register-box"
import SlideAOMImage from "./slide-aom-image"

type IageUploadBoxPT = {
	aomInfoArr: TResAOM
	focusedIdx: number
}

export default function ImageViewerdBox({
	aomInfoArr,
	focusedIdx,
}: IageUploadBoxPT) {
	return (
		<div
			className={cn(
				"flex h-full w-full items-center justify-center",
				hasAOMImages(aomInfoArr)
					? "rounded-2xl bg-BGblue01 max-lg:hidden"
					: "bg-White",
			)}
		>
			{hasAOMImages(aomInfoArr) ? (
				<SlideAOMImage aomInfoArr={aomInfoArr} focusedIdx={focusedIdx} />
			) : (
				<RegisterBox />
			)}
		</div>
	)
}
