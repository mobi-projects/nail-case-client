import type { EmblaCarouselType } from "embla-carousel"
import { useState } from "react"
/**
 * @param itemArr - pulldown의 옵션목록을 Array<string>타입으로 입력.
 */
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
/**
 * @param initialOptionList - option 목록을 Array<string>타입형태로 입력
 */
export const useOption = (initialOptionList: Array<string>) => {
	const optionArr = initialOptionList
	const [checkedOption, setCheckedOption] = useState<Array<string>>([])

	const onClickOption = (option: string) => {
		setCheckedOption((prevList) => {
			return prevList.includes(option)
				? prevList.filter((item) => item !== option)
				: [...prevList, option]
		})
	}
	return { onClickOption, checkedOption, optionArr }
}


export const useBanner = () => {
	const [carouselIdx, setCarouselIdx] = useState(0)
	/**
	 * @description - carouse 스크롤시 carouseIdx를 추적
	 */
	const handleCarousel = (api?: EmblaCarouselType) => {
		if (!api) return
		api.on("select", () => {
			const newIdx = api?.selectedScrollSnap()
			if (typeof newIdx === "number") {
				setCarouselIdx(newIdx)
			}
		})
	}

	return { carouselIdx, handleCarousel }

export const useToolbar = (arr: Array<string>) => {
	const toolbarArr = arr
	const [isSelected, setIsSelected] = useState(1)
	const hadleSelected = (idx: number) => {
		setIsSelected(idx)
	}
	return { toolbarArr, isSelected, hadleSelected }

}
