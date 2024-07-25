/** 배열 깊은 복사 */
export const arrayDeepCopy = <T>(arr: Array<T>): Array<T> =>
	JSON.parse(JSON.stringify(arr))
/** 특정 범위 내에서 수치 조정  */
export const adjustWithinSafeBoundary = (
	number: number,
	maximum: number,
	minimum: number,
) => {
	if (number > maximum) return maximum
	if (number < minimum) return minimum
	return number
}
