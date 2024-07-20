"use client"
import type { PropsWithChildren } from "react"
import { useState } from "react"

import SectionBody from "./section-body"
import SectionHeader from "./section-header"

type ExpandableSectionPT = PropsWithChildren & {
	title: string
}

export default function ExpandableSection({
	title,
	children,
}: ExpandableSectionPT) {
	const [isExpanded, setIsExpanded] = useState(false)
	const [childrenAnimClass, setChildrenAnimClass] = useState<string>(
		CHILDREN_ANIMATION.idle,
	)
	const onHandleExpansion = () => {
		if (!isExpanded) {
			setIsExpanded(true)
			setChildrenAnimClass(CHILDREN_ANIMATION.entered)
		} else {
			setChildrenAnimClass(CHILDREN_ANIMATION.idle)
			setTimeout(() => {
				setIsExpanded(false)
			}, 150)
		}
	}
	return (
		<section className="relative h-fit min-h-[65px] w-full rounded-[18px]">
			<SectionHeader {...{ isExpanded, onHandleExpansion }}>
				{title}
			</SectionHeader>
			<SectionBody className={childrenAnimClass}>{children}</SectionBody>
		</section>
	)
}

const CHILDREN_ANIMATION = {
	idle: "hidden -translate-y-1 opacity-0",
	entered: "flex translate-y-0 opacity-100",
} as const
