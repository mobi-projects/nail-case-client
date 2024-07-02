import { useCallback } from "react"

export const useControlBodyScroll = () => {
	/** body 태그의 현재 위치로 스크롤을 고정 */
	const pauseBodyScroll = useCallback(() => {
		const currentScrollY = window.scrollY
		document.body.style.position = "fixed"
		document.body.style.width = "100%"
		document.body.style.top = `-${currentScrollY}px`
		document.body.style.overflowY = "scroll"
		return currentScrollY
	}, [])
	/** body 태그의 스크롤 허용 */
	const restartBodyScroll = useCallback((prevScrollY: number) => {
		document.body.style.position = ""
		document.body.style.width = ""
		document.body.style.top = ""
		document.body.style.overflowY = ""
		window.scrollTo(0, prevScrollY)
	}, [])
	return { pauseBodyScroll, restartBodyScroll }
}
