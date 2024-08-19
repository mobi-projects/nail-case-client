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

/** AOM 조회 응답배열을 받아서 imageId 배열정보만 포함하는 새로운 배열로 반환 */
export const createInitIdsArr = (arr: TResAOM) => {
	const idArr: Array<number> = []
	arr.forEach((info) => idArr.push(info.imageId))
	return idArr
}

/** 서버로 전송할 formData생성  */
export const createAOMFormData = (
	aomImageArr: TResAOM,
	keepIdArr: Array<number>,
	removeIdArr: Array<number>,
) => {
	const formData = new FormData()

	aomImageArr.forEach((image) => {
		if (image.file) {
			formData.append("newImages", image.file)
		}
	})
	if (keepIdArr.length > 0) {
		formData.append("keepIds", JSON.stringify(keepIdArr))
	}
	if (removeIdArr.length > 0) {
		formData.append("removeIds", JSON.stringify(removeIdArr))
	}
	return formData
}
