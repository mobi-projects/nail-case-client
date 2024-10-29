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
			className={cn(
				"relative h-28 w-28 min-w-28 cursor-pointer overflow-hidden rounded-md bg-white shadow-customGray80 transition-all max-md:h-[5.5rem] max-md:w-[5.5rem] max-md:min-w-0",
				isFocused ? "ring-2 ring-PB50" : "ring-transparent",
			)}
			onClick={() => setFocusedIdx(() => idx)}
		>
			<Image
				alt="이달의 아트"
				src={imageUrl}
				fill
				sizes="30vw"
				priority
				className="rounded-md transition-all hover:scale-110"
			/>
		</div>
	)
}
