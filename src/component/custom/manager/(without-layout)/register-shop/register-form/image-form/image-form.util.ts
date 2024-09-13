/** 배열 중, 특정 index 위치의 원소를 삭제 */
export const deleteElemOneByIdx = <T>(arr: Array<T>, idx: number): Array<T> => {
	if (idx < 0 || arr.length <= idx)
		throw new Error("배열의 범위를 벗어났습니다.")
	const preArr = arr.slice(0, idx)
	const postArr = arr.slice(idx + 1)
	return preArr.concat(postArr)
}

/** FileList를 Arr형태로 변환 */
export const createFilesListToArr = (fileList: FileList) => Array.from(fileList)

/** 기존이미지 + 새로등록된 이미지의 개수가 threshold보다 큰지 check */
export const canUploadImages = (
	prevImageArr: Array<File>,
	newImages: Array<File>,
	threshold: number,
) => prevImageArr.length + newImages.length <= threshold
