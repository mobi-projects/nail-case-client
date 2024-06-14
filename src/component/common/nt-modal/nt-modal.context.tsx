"use client"
import type { ComponentPropsWithoutRef, PropsWithChildren } from "react"
import { createContext, useContext, useState } from "react"

import NTModal from "."

type NTModalPT = ComponentPropsWithoutRef<typeof NTModal>

type ModalContextPT = {
	onOpen: (props: NTModalPT) => void
	onClose: VoidFunction
}
const ModalContextInit = {
	onOpen: () => {},
	onClose: () => {},
}
const ModalContext = createContext<ModalContextPT>(ModalContextInit)
export const useModal = () => useContext(ModalContext)

export const ModalProvider = ({ children }: PropsWithChildren) => {
	const [propsArr, setPropsArr] = useState<NTModalPT[]>([])
	const onOpen = ({ ...newAttributes }) =>
		setPropsArr((prev) => {
			const _prev = [...prev]
			_prev.push(newAttributes)
			return _prev
		})
	const onClose = () =>
		setPropsArr((prev) => {
			const _prev = [...prev]
			_prev.pop()
			return _prev
		})

	return (
		<ModalContext.Provider value={{ onOpen, onClose }}>
			{children}
			{propsArr.map((attribute, idx) => (
				<NTModal key={idx} {...{ attribute }} onClose={onClose}>
					{attribute.children}
				</NTModal>
			))}
		</ModalContext.Provider>
	)
}
