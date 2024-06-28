import type { EmblaCarouselType } from "embla-carousel"
import { useCallback, useEffect, useRef, useState } from "react"

export const usePulldown = () => {
	const [isOpen, setIsOpen] = useState(false)
	const [clickedOption, setClickedOption] = useState("")
	const boxRef = useRef<HTMLDivElement>(null)
	const onClickTrigger = () => {
		setIsOpen((prev) => !prev)
	}
	const onClickItems = (item: string) => {
		setClickedOption(item)
		setIsOpen(false)
	}
	const onClickWrapper = useCallback(() => {
		setIsOpen(false)
	}, [setIsOpen])

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (boxRef.current && !boxRef.current.contains(event.target as Node)) {
				onClickWrapper()
			}
		}

		document.addEventListener("mousedown", handleClickOutside)
		return () => {
			document.removeEventListener("mousedown", handleClickOutside)
		}
	}, [boxRef, onClickWrapper])
	return {
		isOpen,
		onClickWrapper,
		onClickTrigger,
		onClickItems,
		clickedOption,
		boxRef,
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
}
