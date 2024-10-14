import type { TResAOM } from "@/util/api-v2/list-monthly-art"

export const isArrayLengthOver = (imageArr: TResAOM, threshold: number) => {
	return imageArr.length > threshold
}

export const isFocusedIdxNumberOver = (
	focusedIdx: number,
	threshold: number,
) => {
	return focusedIdx > threshold
}

export const getSlideCss = (focusedIdx: number) => {
	return isFocusedIdxNumberOver(focusedIdx, 4) ? `-translate-x-[40rem]` : ""
}
