"use client"

import type { VariantProps } from "class-variance-authority"
import { cva } from "class-variance-authority"

import { cn } from "@/config/tailwind"

const OptionVariants = cva(
	"active:text-PB110 flex items-center justify-center border-[1px] border-transparent px-[24px] text-center text-PB100 focus-visible:outline-none active:border-PB100 active:bg-BGblue02 active:shadow-[0_0_16_0_rgba(128,214,248,0.4)] disabled:border-none disabled:bg-Gray10",
	{
		variants: {
			size: {
				medium:
					"h-[44px] rounded-[35px] py-[10px] text-Body01 disabled:text-Gray70",
				large:
					"h-[52px] rounded-[26px] py-[12px] text-Headline02 font-Regular disabled:text-Gray50",
			},
			isPressed: {
				true: "text-White bg-PB100",
				false: "text-PB110 bg-BGblue01",
			},
		},
		defaultVariants: {
			size: "medium",
			isPressed: false,
		},
	},
)

type NTOptionPT = VariantProps<typeof OptionVariants> & {
	optionArr: string[]
	onSelect?: (idx: number) => void
	selectedIdxArr?: number[]
	disabledIdxArr?: number[]
	className?: string
}
export default function NTOption({
	optionArr,
	onSelect,
	selectedIdxArr = [],
	disabledIdxArr = [],
	className,
	size,
}: NTOptionPT) {
	const onClickOption = (idx: number) => {
		onSelect && onSelect(idx)
	}
	return (
		<div
			className={cn(
				"flex h-fit w-fit flex-wrap gap-[10px] text-nowrap",
				className,
			)}
		>
			{optionArr.map((optionOne, idx) => (
				<button
					key={optionOne}
					className={cn(
						OptionVariants({
							size,
							isPressed: selectedIdxArr.includes(idx),
						}),
						onSelect ? "cursor-pointer" : "cursor-default",
					)}
					disabled={disabledIdxArr.includes(idx)}
					onClick={() => {
						onClickOption(idx)
					}}
				>
					{optionOne}
				</button>
			))}
		</div>
	)
}
