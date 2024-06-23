import type { VariantProps } from "class-variance-authority"
import { cva } from "class-variance-authority"

import { cn } from "@/config/tailwind"

const EventDetailVariants = cva(
	" w-full  pl-[21px] rounded-[12px] flex justify-start items-center py-[14px] active:border",
	{
		variants: {
			variant: {
				PB: "bg-BGblue02 border-PB50   ",
				PY: "bg-PY50 bg-opacity-60 border-PY100   ",
				Gray: "bg-Gray10 border-Gray50  ",
			},
		},
	},
)

export type NTEventDetailPT = VariantProps<typeof EventDetailVariants> & {
	children: React.ReactNode
	className?: string
	name: string
}

export default function NTEventDetail({
	variant,
	className,
	children,
	name,
}: NTEventDetailPT) {
	return (
		<div className={cn(EventDetailVariants({ variant }), className)}>
			<span className="text-Body02 font-Bold text-Gray100">{name}</span>
			<span className="text-Callout font-Light text-Gray100">{children}</span>
		</div>
	)
}
