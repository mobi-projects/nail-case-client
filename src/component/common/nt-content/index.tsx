import { cva } from "class-variance-authority"

import { cn } from "@/config/tailwind"

type NTContentPT = {
	mode?: "day" | "dark"
	children: string | number
	className?: string
}

const ContentVaraints = cva(
	"flex h-fit w-fit items-center  justify-center rounded-[35px] border-[0.5px] border-Gray30 px-[28px] py-[7px] text-Callout tabular-nums lg:px-[12px] lg:py-[6px] max-md:px-[4px] max-md:py-[2px]",
	{
		variants: {
			mode: {
				day: "bg-Gray10  text-Gray50",
				dark: " bg-Gray100/50  text-White",
			},
		},
		defaultVariants: { mode: "day" },
	},
)

export default function NTContent({ children, mode, className }: NTContentPT) {
	return (
		<div className={cn(ContentVaraints({ mode }), className)}>
			<span>{children}</span>
		</div>
	)
}
