import type { TResAOM } from "@/util/api-v2/list-monthly-art"

/** 기존에 등록된 이미지 인지여부를 판단 */
export const isOldImages = (id: number, keepIdArr: Array<number>) => {
	return keepIdArr.includes(id)
}

/** idx와 일치하는 요소를 제외한 배열을 반환 */
export const filterImagesByIdx = (arr: TResAOM, idx: number) => {
	return arr.filter((data) => data.imageId !== idx)
}

/** 기존 이미지를 삭제할때를 다루는 handler함수 */
export const handleOldImageRemoval = (
	curIdx: number,
	keepIdArr: Array<number>,
	removeIdArr: Array<number>,
) => {
	if (isOldImages(curIdx, keepIdArr)) {
		const removeIdx = keepIdArr.findIndex((id) => id === curIdx)
		const deletedIdx = keepIdArr.splice(removeIdx, 1)[0]
		removeIdArr.push(deletedIdx)
	}
}
