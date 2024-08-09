export const isArrayLengthOver = (
	imageArr: Array<{
		imageUrl: string
		imageId: number
	}>,
	threshold: number,
) => {
	return imageArr.length > threshold
}

export const isFocusedIdxNumberOver = (
	focusedIdx: number,
	threshold: number,
) => {
	return focusedIdx > threshold
}

export const getSlideCss = (focusedIdx: number) => {
	return isFocusedIdxNumberOver(focusedIdx, 4) ? `-translate-x-[36rem]` : ""
}
