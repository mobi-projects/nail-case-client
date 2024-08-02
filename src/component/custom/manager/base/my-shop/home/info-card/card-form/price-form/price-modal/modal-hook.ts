import { useState } from "react"

type TUseModalHook = {
	alt: string
	src: string
}
export function useModalHook(images: Array<TUseModalHook>) {
	const [currentIdx, setCurrentIdx] = useState(0)

	const handlePrev = () => {
		if (currentIdx > 0) {
			setCurrentIdx(currentIdx - 1)
		}
	}

	const handleNext = () => {
		if (currentIdx < images.length - 1) {
			setCurrentIdx(currentIdx + 1)
		}
	}

	const prevDisabled = currentIdx === 0
	const nextDisabled = currentIdx === images.length - 1

	return { currentIdx, handlePrev, handleNext, prevDisabled, nextDisabled }
}
