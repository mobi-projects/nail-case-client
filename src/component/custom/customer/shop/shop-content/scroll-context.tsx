"use client"

import type { ReactNode, RefObject } from "react"
import React, { createContext, useContext, useRef, useState } from "react"

type ScrollContextType = {
	shopInfoRef: RefObject<HTMLDivElement>
	designRef: RefObject<HTMLDivElement>
	newsRef: RefObject<HTMLDivElement>
	reviewRef: RefObject<HTMLDivElement>
	scrollToSection: (ref: RefObject<HTMLDivElement>) => void
	setFocusedSection: (section: string) => void
	focusedSection: string
}

const ScrollContext = createContext<ScrollContextType | null>(null)

export const ScrollProvider: React.FC<{ children: ReactNode }> = ({
	children,
}) => {
	const shopInfoRef = useRef<HTMLDivElement>(null)
	const designRef = useRef<HTMLDivElement>(null)
	const newsRef = useRef<HTMLDivElement>(null)
	const reviewRef = useRef<HTMLDivElement>(null)

	const [focusedSection, setFocusedSection] = useState<string>("")

	const scrollToSection = (ref: RefObject<HTMLDivElement>) => {
		const offset = 40
		if (ref.current) {
			const topPosition =
				ref.current.getBoundingClientRect().top + window.pageYOffset - offset
			window.scrollTo({ top: topPosition, behavior: "smooth" })
		}
	}

	return (
		<ScrollContext.Provider
			value={{
				shopInfoRef,
				designRef,
				newsRef,
				reviewRef,
				scrollToSection,
				focusedSection,
				setFocusedSection,
			}}
		>
			{children}
		</ScrollContext.Provider>
	)
}

export const useScroll = () => {
	const context = useContext(ScrollContext)
	if (!context) {
		throw new Error("Scroll Error")
	}
	return context
}
