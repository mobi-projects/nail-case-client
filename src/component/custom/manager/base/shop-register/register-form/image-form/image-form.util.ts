/** 새원소를 LIFO 구조의 배열에 추가 */
export const pushNewElemIntoLIFOArr = <T>(
	arr: Array<T>,
	elem: T,
	size: number = Number.MAX_SAFE_INTEGER,
) => {
	const result = [...arr, elem]
	while (result.length > size) result.shift()
	return result
}
/** 배열 중, 특정 index 위치의 원소를 삭제 */
export const deleteElemOneByIdx = <T>(arr: Array<T>, idx: number): Array<T> => {
	if (idx < 0 || arr.length <= idx)
		throw new Error("배열의 범위를 벗어났습니다.")
	const preArr = arr.slice(0, idx)
	const postArr = arr.slice(idx + 1)
	return preArr.concat(postArr)
}
