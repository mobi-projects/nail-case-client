import Image from "next/image"

import { NTButton } from "@/component/common/atom/nt-button"
import NTIcon from "@/component/common/nt-icon"
import { cn } from "@/config/tailwind"

import { hasAOMImages } from "../aom.utils"

type IageUploadBoxPT = {
	aomInfoArr: Array<{
		imageUrl: string
		imageId: number
	}>
	focusedIdx: number
}

export default function ImageViewerdBox({
	aomInfoArr,
	focusedIdx,
}: IageUploadBoxPT) {
	return (
		<div
			className={cn(
				"relative flex h-80 w-80 min-w-80 flex-col items-center justify-center gap-y-3 rounded-3xl border-[1.5px] bg-BGblue01 text-Gray70",
				hasAOMImages(aomInfoArr) ? "border-transparent" : "border-PB50",
			)}
		>
			{hasAOMImages(aomInfoArr) ? (
				<Image
					src={aomInfoArr[focusedIdx].imageUrl}
					alt="이달의 아트"
					fill
					sizes="40vw"
					priority
					className="rounded-3xl"
				/>
			) : (
				<>
					<NTIcon icon="camera" className="h-9 w-9 text-Gray80" />
					<p className="text-Body01 text-[18px] font-SemiBold">
						사진을 등록하세요.
					</p>
					<p className="text-Body02"> 최대 10장까지 첨부 가능해요.</p>
					<NTButton flexible={"fit"}>이달의 아트 등록</NTButton>
				</>
			)}
		</div>
	)
}
