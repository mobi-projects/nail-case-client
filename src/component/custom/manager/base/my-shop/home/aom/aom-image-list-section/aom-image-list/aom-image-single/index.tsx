import Image from "next/image"
import type { Dispatch, SetStateAction } from "react"

import { cn } from "@/config/tailwind"

type AOMInageBoxPT = {
	imageUrl: string
	isFocused: boolean
	setFocusedIdx: Dispatch<SetStateAction<number>>
	idx: number
}

export default function AOMImageSingle({
	imageUrl,
	isFocused,
	setFocusedIdx,
	idx,
}: AOMInageBoxPT) {
	return (
		<div
			className="relative h-24 w-24 min-w-24 cursor-pointer rounded-[26px] bg-White shadow-customGray80 transition-all"
			onClick={() => setFocusedIdx(() => idx)}
		>
			<Image
				alt="이달의 아트"
				src={imageUrl}
				fill
				sizes="30vw"
				priority
				className={cn(
					"rounded-md border-2",
					isFocused ? "border-PB50" : "border-transparent",
				)}
			/>
		</div>
	)
}
