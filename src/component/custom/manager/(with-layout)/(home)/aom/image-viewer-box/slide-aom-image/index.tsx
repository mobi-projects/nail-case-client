import Image from "next/image"
import { useEffect, useState } from "react"

import { cn } from "@/config/tailwind"
import type { TResAOM } from "@/util/api/list-monthly-art"

type SlideAOMImagePT = {
	aomInfoArr: TResAOM
	focusedIdx: number
}

export default function SlideAOMImage({
	aomInfoArr,
	focusedIdx,
}: SlideAOMImagePT) {
	const [curIdx, setCurIdx] = useState(focusedIdx)

	useEffect(() => {
		setCurIdx(focusedIdx)
	}, [focusedIdx])

	const getSlidePosition = () => {
		return `translateX(-${curIdx * 350}px)`
	}

	return (
		<div
			className={cn(
				"absolute left-0 flex h-fit w-fit items-center gap-x-8 transition-all duration-500",
			)}
			style={{ transform: getSlidePosition() }}
		>
			{aomInfoArr.map((aom, idx) => (
				<div
					className="relative flex h-80 w-80 items-center justify-center"
					key={idx}
				>
					<Image
						src={aom.imageUrl}
						alt="이달의 아트"
						fill
						sizes="40vw"
						priority
						className="rounded-3xl"
					/>
				</div>
			))}
		</div>
	)
}
