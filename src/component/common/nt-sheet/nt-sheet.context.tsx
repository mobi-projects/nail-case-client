"use client"

import type { ComponentPropsWithoutRef, PropsWithChildren } from "react"
import { createContext, useContext, useRef, useState } from "react"

import { cn } from "@/config/tailwind"

import NTSheet from "."

type NTSheetPT = ComponentPropsWithoutRef<typeof NTSheet>

const ANIMATION_DURATION = 300
const ANIMATION_STATES = {
	idle: `translate-y-[25%] opacity-0`,
	entered: `translate-y-0 opacity-100`,
	exited: "translate-y-[75%] opacity-0",
} as const

const initContextValue = {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	onOpenSheet: (args: PropsWithChildren) => {},
	onCloseSheet: () => {},
}
const initAttribute: NTSheetPT = {
	children: undefined,
}

const SheetContext = createContext(initContextValue)
export const useSheet = () => useContext(SheetContext)

export const SheetProvider = ({ children }: PropsWithChildren) => {
	const sheetRef = useRef<HTMLDialogElement>(null)
	const [sheetAttributes, setSheetAttributes] =
		useState<NTSheetPT>(initAttribute)
	const [animatedClass, setAnimatedClass] = useState<string>(
		ANIMATION_STATES.idle,
	)

	const onOpenSheet = ({ children }: PropsWithChildren) => {
		setTimeout(() => {
			setAnimatedClass(ANIMATION_STATES.entered)
		}, ANIMATION_DURATION)
		sheetRef.current?.showModal()
		setSheetAttributes({ ...{ children } })
	}
	const onCloseSheet = () => {
		setAnimatedClass(ANIMATION_STATES.exited)
		setTimeout(() => {
			sheetRef.current?.close()
			setSheetAttributes(initAttribute)
		}, ANIMATION_DURATION)
	}
	return (
		<SheetContext.Provider value={{ onOpenSheet, onCloseSheet }}>
			{children}
			<NTSheet
				{...{ ...sheetAttributes }}
				ref={sheetRef}
				className={cn("transition-all duration-300 ease-in-out", animatedClass)}
			/>
		</SheetContext.Provider>
	)
}
