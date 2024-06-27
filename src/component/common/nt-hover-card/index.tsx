"use client"

import { useEffect, useRef, useState } from "react"

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
	const cardRef = useRef<HTMLDivElement | null>(null)
	const handleClick = () => {
		setIsExpanded(true)
	}
	const handleOutsideClick = (event: MouseEvent) => {
		if (cardRef.current && !cardRef.current.contains(event.target as Node)) {
			setIsExpanded(false)
		}
	}
	useEffect(() => {
		if (isExpanded) {
			document.addEventListener("mousedown", handleOutsideClick)
		} else {
			document.removeEventListener("mousedown", handleOutsideClick)
		}
	}, [isExpanded])
	return (
		<div className="relative">
			<div onClick={handleClick} className="cursor-pointer" ref={cardRef}>
				{children}
			</div>
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
