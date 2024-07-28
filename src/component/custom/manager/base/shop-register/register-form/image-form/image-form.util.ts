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
