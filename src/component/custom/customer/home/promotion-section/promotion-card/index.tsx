import type { StaticImageData } from "next/image"
import Image from "next/image"
import type { ReactNode } from "react"

import { cn } from "@/config/tailwind"

type PromotionCardPT = {
	src: StaticImageData
	className?: string
	children?: ReactNode
}

export default function PromotionCard({
	src,
	className,
	children,
}: PromotionCardPT) {
	return (
		<div
			className={cn(
				"relative z-10 flex h-64 w-[500px] min-w-[500px] items-center rounded-3xl",
				className,
			)}
		>
			<div className="absolute h-full w-full text-Title01 text-White">
				{children}
			</div>
			<Image
				src={src}
				alt="네일 이미지"
				fill
				sizes="50vw"
				className={cn("rounded-3xl", className ? "opacity-15" : "opacity-100")}
			/>
		</div>
	)
}
