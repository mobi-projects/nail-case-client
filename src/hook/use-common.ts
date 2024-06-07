import { useState } from "react"

export const usePulldown = (itemArr: Array<string>) => {
	const [isOpen, setIsOpen] = useState(false)
	const [optionArr, setOptionArr] = useState<typeof itemArr>(itemArr)

	const onClickTrigger = () => {
		setIsOpen((prev) => !prev)
	}
	const onClickItems = (idx: number) => {
		setOptionArr((prev) => {
			const newArr = [...prev]
			newArr[0] = prev[idx + 1]
			newArr[idx + 1] = prev[0]
			return newArr
		})
	}
	const onClickWrapper = () => {
		setIsOpen(false)
	}

	return {
		isOpen,
		onClickWrapper,
		onClickTrigger,
		onClickItems,
		optionArr,
	}
}
