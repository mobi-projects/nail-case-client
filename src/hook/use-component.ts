import type { EmblaCarouselType } from "embla-carousel"
import useEmblaCarousel from "embla-carousel-react"
import { useCallback, useEffect, useRef, useState } from "react"

import { isUndefined } from "@/util/common/type-guard"

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

export const useBannerImageCarousel = (
	isInfinity: boolean = false,
	accessSelected: ((idx: number) => void) | undefined,
) => {
	const [carouselRef, carouselController] = useEmblaCarousel({
		loop: isInfinity,
	})
	const updateSelectedIdx = useCallback(
		(carouselController: EmblaCarouselType) => {
			accessSelected && accessSelected(carouselController.selectedScrollSnap())
		},
		[accessSelected],
	)
	useEffect(() => {
		if (isUndefined(carouselController)) return
		carouselController.on("select", updateSelectedIdx)
		carouselController.on("reInit", updateSelectedIdx)
	}, [carouselController, updateSelectedIdx])
	return { carouselRef }
}
