"use client"

import { useState } from "react"

import { cn } from "@/config/tailwind"

type NTHoverCardPT = {
	children: React.ReactNode
	className?: string
	contants: string
}
export default function NTHoverCard({
	children,
	className,
	contants,
}: NTHoverCardPT) {
	const [isExpanded, setIsExpanded] = useState(false)

	const handleMouseEnter = () => {
		setIsExpanded(true)
	}
	const handleMouseLeave = () => {
		setIsExpanded(false)
	}

	return (
		<div
			className="relative"
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
		>
			<div className="cursor-pointer">{children}</div>
			{isExpanded && (
				<div
					className={cn(
						"absolute z-30 mt-5 min-w-[263px] max-w-[388px] rounded-[12px] bg-white p-4 text-Callout text-Gray100 shadow-customGray60",
						className,
					)}
				>
					{contants}
				</div>
			)}
		</div>
	)
}
