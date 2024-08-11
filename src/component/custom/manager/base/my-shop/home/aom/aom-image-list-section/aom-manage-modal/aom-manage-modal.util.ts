import type { TResAOM } from "@/util/api-v2/list-monthly-art"

export const isAOMImageArrayFull = (arr: TResAOM, treshold: number) => {
	return arr.length === treshold
}
export const isAOMImageArryEmpty = (arr: TResAOM) => {
	return arr.length === 0
}

export const getSlideCss = (isGuideVisible: boolean) => {
	return isGuideVisible
		? "translate-x-0 opacity-100 duration-500"
		: "translate-x-full opacity-0 duration-200"
}

export const getAOMModalBtnText = (isGuideVisible: boolean) => {
	return isGuideVisible ? "다음" : "등록 완료"
}
