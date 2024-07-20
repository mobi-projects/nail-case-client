import type { HTMLAttributes, PropsWithChildren } from "react"

import { cn } from "@/config/tailwind"

type SectionBodyPT = PropsWithChildren & HTMLAttributes<HTMLDivElement>
export default function SectionBody({ children, className }: SectionBodyPT) {
	return (
		<div
			className={cn(
				"h-fit w-full rounded-[18px] bg-BGblue01 px-[45px] pb-[45px] pt-[90px] transition-all duration-150",
				className,
			)}
		>
			{children}
		</div>
	)
}
