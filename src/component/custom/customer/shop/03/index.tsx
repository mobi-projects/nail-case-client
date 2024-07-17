"use client"

import type { VariantProps } from "class-variance-authority"
import { cva } from "class-variance-authority"
import React from "react"

import { cn } from "@/config/tailwind"

import { useScroll } from "../05/scroll-context"

const toolbarVariants = cva(
	"flex h-full w-fit min-w-[70px] cursor-pointer flex-nowrap justify-center gap-[42px] border-transparent px-[2px] text-Gray50 hover:text-PB50 focus:text-PB100 focus-visible:outline-none",
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

type CustomerNaviBarPT = VariantProps<typeof toolbarVariants> & {
	toolList: string[]
	className?: string
	onToolClick: (tool: string) => void
}

export default function CustomerNaviBar({
	size,
	position,
	toolList,
	className,
	onToolClick,
}: CustomerNaviBarPT) {
	const { focusedSection } = useScroll()

	const noDuplicatedToolList = [...new Set(toolList)]

	return (
		<div
			className={cn(
				"sticky top-0 z-10 flex h-[60px] w-full items-center justify-between bg-white",
				className,
			)}
		>
			{noDuplicatedToolList.map((tool: string) => (
				<div
					className={cn(
						toolbarVariants({ size, position }),
						focusedSection === tool && "border-PB100 text-PB100",
					)}
					onClick={() => onToolClick(tool)}
					key={tool}
				>
					{tool}
				</div>
			))}
		</div>
	)
}
