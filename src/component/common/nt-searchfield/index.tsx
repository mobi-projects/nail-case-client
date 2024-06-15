import { cva } from "class-variance-authority"
import { forwardRef } from "react"

import { cn } from "@/config/tailwind"

import NTIcon from "../nt-icon"

type NTSearchfieldPT = {
	size?: "large" | "small"
	isDisabled?: boolean
}

const SearchfieldVariants = cva(
	"group flex h-[50px] max-w-full items-center rounded-[6px] border-[1.6px] px-[12px] focus-within:border-[2px] focus-within:hover:border-PB100",
	{
		variants: {
			size: {
				large: "w-[690px]",
				small: "w-[430px]",
			},
			isDisabled: {
				true: "border-Gray20 hover:border-Gray20",
				false: "border-PB100 border-PB100 hover:border-PB50",
			},
		},
		defaultVariants: {
			size: "large",
			isDisabled: false,
		},
	},
)

const NTSearchfield = forwardRef<HTMLInputElement, NTSearchfieldPT>(
	({ size, isDisabled }, ref) => {
		return (
			<div className={SearchfieldVariants({ size, isDisabled })}>
				<NTIcon
					icon="search"
					className={cn(
						"h-9 w-9 text-PB90 group-hover:text-PB50 group-focus-within:group-hover:text-PB100",
						isDisabled && "text-Gray50 group-hover:text-Gray50",
					)}
				/>
				<input
					ref={ref}
					className={cn(
						"peer/input h-[22px] w-full border-none pl-[6px] text-Body02 placeholder:text-Gray40 focus:outline-none focus:placeholder:text-black",
						isDisabled && "placeholder:text-Gray30",
					)}
					placeholder="검색어를 입력해주세요"
					disabled={isDisabled}
				/>
			</div>
		)
	},
)

NTSearchfield.displayName = "NTSearchfield"

export default NTSearchfield
