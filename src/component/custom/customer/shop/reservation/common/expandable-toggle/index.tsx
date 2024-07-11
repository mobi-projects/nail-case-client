"use client"
import { useState, type PropsWithChildren } from "react"

import NTIcon from "@/component/common/nt-icon"
import { cn } from "@/config/tailwind"

const ANIMATED_STATE = {
	idle: "-translate-y-1 opacity-0",
	active: "translate-y-0 opacity-100",
}

export function ExpandableToggle({
	title,
	children,
}: PropsWithChildren & { title: string }) {
	const [isOpen, setIsOpen] = useState(true)
	const [childAnimClass, setChildAnimClass] = useState(ANIMATED_STATE.idle)

	const onToggle = async () => {
		if (isOpen) {
			setIsOpen(false)
			setTimeout(() => {
				setChildAnimClass(ANIMATED_STATE.active)
			}, 100)
		} else {
			setChildAnimClass(ANIMATED_STATE.idle)
			setTimeout(() => {
				setIsOpen(true)
			}, 100)
		}
	}

	return (
		<div className="h-fit w-full border-b border-b-Gray20">
			<div className="flex items-end justify-between py-4">
				<h2 className="text-Title03 text-Gray70">{title}</h2>
				<NTIcon
					icon="expandDownLight"
					className={cn(
						"transition-all duration-150 hover:cursor-pointer",
						isOpen && "rotate-180",
					)}
					onClick={onToggle}
				/>
			</div>
			{children && (
				<div
					className={cn(
						"mt-2 flex px-2 pb-4 transition-opacity duration-150",
						childAnimClass,
						isOpen && "hidden",
					)}
				>
					{children}
				</div>
			)}
		</div>
	)
}
