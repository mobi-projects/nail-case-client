"use client"

import type { ComponentProps, PropsWithChildren } from "react"
import { createContext, useContext, useState } from "react"

import NTModal from "."

type NTModalPT = ComponentProps<typeof NTModal>

const initContextValue = {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	onOpenModal: (args: Partial<NTModalPT>) => {},
	onCloseModal: () => {},
	onClearModal: () => {},
}
const ModalContext = createContext(initContextValue)
export const useModal = () => useContext(ModalContext)

export const ModalProvider = ({ children }: PropsWithChildren) => {
	const [modalAttributeArr, setModalAttributeArr] = useState<NTModalPT[]>([])

	const onOpenModal = (args: Partial<NTModalPT>) => {
		setModalAttributeArr((prev) => {
			const _prev = [...prev]
			_prev.push(args)
			return _prev
		})
	}
	const onCloseModal = () => {
		setModalAttributeArr((prev) => {
			const _prev = [...prev]
			_prev.pop()
			return _prev
		})
	}
	const onClearModal = () => {
		setModalAttributeArr([])
	}
	return (
		<ModalContext.Provider value={{ onOpenModal, onCloseModal, onClearModal }}>
			{children}
			{modalAttributeArr.map((attribute, idx) => {
				return <NTModal key={idx} {...attribute} />
			})}
		</ModalContext.Provider>
	)
}
