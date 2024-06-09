import type { VariantProps } from "class-variance-authority"
import { cva } from "class-variance-authority"
import type { ButtonHTMLAttributes } from "react"

import { cn } from "@/config/tailwind"

const TimeSwitchVariants = cva(
	"flex items-center justify-center w-[142px] h-[36px] px-[20px] py-[8px] rounded-[9px] border space-x-8 text-Callout",
	{
		variants: {
			variant: {
				active: "bg-PB80 text-White",
				inactive: "bg-Gray10 text-Gray60 border-Gray30",
			},
		},
		defaultVariants: {
			variant: "inactive",
		},
	},
)

export type TimeSwitchProps = ButtonHTMLAttributes<HTMLButtonElement> &
	VariantProps<typeof TimeSwitchVariants> & {
		children?: React.ReactNode
		onClick?: () => void
	}

export const NTTimeSwitch: React.FC<TimeSwitchProps> = ({
	variant,
	className,
	children,
	onClick,
	...props
}) => {
	return (
		<button
			className={cn(
				TimeSwitchVariants({ variant }),
				className,
				"whitespace-nowrap",
			)}
			onClick={onClick}
			{...props}
		>
			{children}
		</button>
	)
}
