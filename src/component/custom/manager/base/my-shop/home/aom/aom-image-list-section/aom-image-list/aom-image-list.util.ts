export const isOverFiveImages = (
	imageArr: Array<{
		imageUrl: string
		imageId: number
	}>,
) => {
	return imageArr.length > 5
}

export const isFocusedIdxOverFive = (focusedIdx: number) => {
	return focusedIdx > 4
}

export const getSlideCss = (focusedIdx: number) => {
	return isFocusedIdxOverFive(focusedIdx) ? `-translate-x-[36rem]` : ""
}
