import type { VariantProps } from "class-variance-authority"
import { cva } from "class-variance-authority"

import { cn } from "@/config/tailwind"

const LabelVariants = cva(
	"flex items-center justify-end pt-[10px] pb-[10px] pr-[16px] w-[156px] h-[42px] rounded-[6px] text-Body02",
	{
		variants: {
			variant: {
				primary: "bg-Gray10 text-Gray40",
				secondary: "bg-PB50 bg-opacity-30 text-Gray80",
				tertiary: "bg-PB60 bg-opacity-50 text-Gray80",
				quaternary: "bg-PB60 text-Gray80",
				quinary: "bg-PB100 text-Gray80",
				senary: "bg-BGblue01 text-PB90",
				septenary: "bg-Gray90 text-PB90",
			},
		},
		defaultVariants: {
			variant: "primary",
		},
	},
)

export type NTEventPT = VariantProps<typeof LabelVariants> & {
	children?: React.ReactNode
	className?: string
}

export const NTEvent: React.FC<NTEventPT> = ({
	variant,
	className,
	children,
	...props
}) => {
	return (
		<div
			className={cn(
				LabelVariants({
					variant,
				}),
				className,
				"overflow-hidden whitespace-nowrap",
			)}
			{...props}
		>
			<span>{children}</span>
		</div>
	)
}
