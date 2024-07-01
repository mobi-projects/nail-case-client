"use client"

import type { ComponentProps, PropsWithChildren } from "react"
import { createContext, useContext, useRef, useState } from "react"

import { cn } from "@/config/tailwind"

import NTModal from "."

type NTModalPT = ComponentProps<typeof NTModal>

const ANIMATION_DURATION = 100
const ANIMATION_STATES = {
	idle: "scale-75 opacity-0",
	entered: "scale-100 opacity-100",
	exited: "scale-50 opacity-0",
} as const

const initContextValue = {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	onOpenModal: (args: Partial<NTModalPT>) => {},
	onCloseModal: () => {},
}
const initModalAttributes: NTModalPT = {
	size: "small",
	isX: false,
}

const ModalContext = createContext(initContextValue)
export const useModal = () => useContext(ModalContext)

export const ModalProvider = ({ children }: PropsWithChildren) => {
	const modalRef = useRef<HTMLDialogElement>(null)
	const [animationClass, setAnimationClass] = useState<string>(
		ANIMATION_STATES.idle,
	)
	const [modalAttributes, setModalAttributes] =
		useState<NTModalPT>(initModalAttributes)
	const onOpenModal = (args: Partial<NTModalPT>) => {
		setTimeout(() => {
			setAnimationClass(ANIMATION_STATES.entered)
		}, ANIMATION_DURATION)
		modalRef.current?.showModal()
		setModalAttributes((prev) => ({
			...prev,
			...args,
		}))
	}
	const onCloseModal = () => {
		setAnimationClass(ANIMATION_STATES.exited)
		setTimeout(() => {
			modalRef.current?.close()
			setModalAttributes(initModalAttributes)
		}, ANIMATION_DURATION)
	}
	return (
		<ModalContext.Provider value={{ onOpenModal, onCloseModal }}>
			{children}
			<div className="sca"></div>
			<NTModal
				{...{ ...modalAttributes }}
				ref={modalRef}
				className={cn(
					"transition-all duration-100 ease-in-out",
					animationClass,
				)}
			/>
		</ModalContext.Provider>
	)
}
