import { cva, type VariantProps } from "class-variance-authority"
import type { ButtonHTMLAttributes } from "react"

import NTIcon, { type ICON_DATA } from "../../nt-icon"

const ButtonVariants = cva(
	"flex items-center justify-center drop-shadow border",
	{
		variants: {
			variant: {
				primary: "bg-PB100 text-White hover:bg-PB80 active:bg-Gray80",
				secondary:
					"bg-BGblue01 text-PB100 hover:bg-BGblue02 active:bg-BGblue01 active:border-PB100 active:border-[1.6px]",
				tertiary:
					"bg-white text-PB100 hover:text-PB80 active:bg-PB80 active:text-White",
			},
			size: {
				large: `w-[144px] h-[62px] rounded-[14px] px-[20px] py-[16px] text-Title03`,
				medium: `w-[127px] h-[56px] rounded-[12px] px-[18px] py-[12px] text-Headline01`,
				small: `w-[110px] h-[50px] rounded-[11px] px-[14px] py-[12px] text-Body01`,
			},
		},
		defaultVariants: {
			variant: "primary",
			size: "medium",
		},
	},
)

const DisabledVariants = cva(
	"flex items-center justify-center drop-shadow border",
	{
		variants: {
			variant: {
				primary: "bg-Gray10 text-Gray60 border-Gray20",
				secondary: "bg-BGblue01 text-PB50",
				tertiary: "bg-Gray20 text-Gray50",
			},
			size: {
				large: `w-[144px] h-[62px] rounded-[14px] px-[20px] py-[16px] text-Title03`,
				medium: `w-[127px] h-[56px] rounded-[12px] px-[18px] py-[12px] text-Headline01`,
				small: `w-[110px] h-[50px] rounded-[11px] px-[14px] py-[12px] text-Body01`,
			},
		},
		defaultVariants: {
			variant: "primary",
			size: "medium",
		},
	},
)

export type NTButtonPT = ButtonHTMLAttributes<HTMLButtonElement> &
	VariantProps<typeof ButtonVariants> & {
		children?: React.ReactNode
		icon?: keyof typeof ICON_DATA
	}

export const NTButton: React.FC<NTButtonPT> = ({
	variant,
	size,
	children,
	icon,
	disabled = true,
	...props
}) => {
	const classes = disabled
		? DisabledVariants({ variant, size })
		: ButtonVariants({ variant, size })

	return (
		<button className={classes} disabled={disabled} {...props}>
			<span className="mr-[6px] whitespace-nowrap">{children}</span>
			{icon && <NTIcon icon={icon} className="w-[28px]" />}
		</button>
	)
}
