"use client"
import type { VariantProps } from "class-variance-authority"
import { cva } from "class-variance-authority"

import { cn } from "@/config/tailwind"

const toolbarVariants = cva(
	"flex h-full w-fit min-w-[70px] flex-nowrap justify-center gap-[42px] border-transparent px-[2px] text-Gray50 hover:text-PB50 focus:text-PB100 focus-visible:outline-none",
	{
		variants: {
			size: {
				small: "text-Body01",
				large: "text-Title03",
			},
			position: {
				bottom: "border-b-[2px] items-end pb-[15px]",
				top: "border-t-[2px] items-start pt-[15px]",
			},
		},
		defaultVariants: {
			size: "small",
			position: "bottom",
		},
	},
)
type NTToolbarPT = VariantProps<typeof toolbarVariants> & {
	toolList: string[]
	focusedIdx?: number
	onClickTool?: (idx: number) => void
	className?: string
}

const NTToolbar = ({
	size,
	position,
	toolList,
	focusedIdx = 0,
	className,
	onClickTool,
}: NTToolbarPT) => {
	const noDuplicatedToolList = [...new Set(toolList)]
	return (
		<div
			className={cn(
				"flex h-[40px] w-fit flex-nowrap items-center justify-between",
				className,
			)}
		>
			{noDuplicatedToolList.map((tool, idx) => (
				<div
					className={cn(
						toolbarVariants({ size, position }),
						focusedIdx === idx && "border-PB100 text-PB100",
					)}
					onClick={() => {
						onClickTool && onClickTool(idx)
					}}
					key={tool}
				>
					{tool}
				</div>
			))}
		</div>
	)
}
export default NTToolbar
