import { cva, type VariantProps } from "class-variance-authority"
import type { ButtonHTMLAttributes } from "react"

import { cn } from "@/config/tailwind"

import NTIcon, { type ICON_DATA } from "../../nt-icon"

const ButtonVariants = cva(
	"flex items-center justify-center drop-shadow border focus-visible:outline-none ",
	{
		variants: {
			variant: {
				primary:
					"bg-PB100 text-White hover:bg-PB80 active:bg-Gray80 disabled:bg-Gray10 disabled:text-Gray60 disabled:border-Gray20 ",
				secondary:
					"bg-BGblue01 text-PB100 hover:bg-BGblue02 active:bg-BGblue01 active:border-PB100 active:border-[1.6px] disabled:bg-BGblue01 disabled:text-PB50",
				tertiary:
					"bg-white text-PB100 hover:text-PB80 active:bg-PB80 active:text-White disabled:bg-Gray20 disabled:text-Gray50",
				alert:
					"bg-[#FFF6F8] text-[#FF2C45] hover:bg-[#FFC3CA] active:text-[#FFF6F8] active:bg-[#FF2C45] disabled:bg-Gray20",
			},
			size: {
				large: `w-[144px] h-[62px] rounded-[14px] px-[20px] py-[16px] text-Title03 `,
				medium: `w-[127px] h-[56px] rounded-[12px] px-[18px] py-[12px] text-Headline01 `,
				small: `w-[110px] h-[50px] rounded-[11px] px-[14px] py-[12px] text-Body01 `,
				exSmall: `w-[91px] h-[56px] rounded-[12px] px-[11px] py-[12px] text-Headline01  font-Bold `,
			},
			flexible: {
				none: "max-md:w-16 max-md:h-10 lg:w-18 lg:h-11",
				fit: "w-fit h-fit",
				full: "w-full",
			},
		},
		defaultVariants: {
			variant: "primary",
			size: "medium",
			flexible: "none",
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
	disabled,
	flexible,
	...props
}) => {
	return (
		<button
			className={cn(
				ButtonVariants({ variant, size, flexible }),
				props.className,
			)}
			disabled={disabled}
			{...props}
		>
			<span className="whitespace-nowrap">{children}</span>
			{icon && <NTIcon icon={icon} className="ml-[6px] w-[28px]" />}
		</button>
	)
}
