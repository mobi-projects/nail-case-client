/** 현재 페이지를 기준으로, 출력될 버튼 배열 중 첫 번호를 반환합니다. */
export const getFront = (curPage: number, perPage: number) =>
	Math.floor((curPage - 1) / perPage) * perPage + 1
/** 현재 페이지를 기준으로, 출력될 버튼 배열 중 뒷 번호를 반환합니다. */
export const getBack = (front: number, perPage: number, totPage: number) =>
	Math.min(front + perPage - 1, totPage)
/** 가장 앞 번호 ~ 가장 뒷 번호 를 포함하는 숫자 배열을 출력합니다. */
export const getPages = (front: number, back: number) =>
	new Array(back - front + 1).fill(front).map((page, idx) => page + idx)
/** 왼쪽 화살표 출력 여부 */
export const isLeftArrow = (pageArr: number[]) => !pageArr.includes(1)
/** 오른쪽 화살표 출력 여부 */
export const isRightArrow = (pageArr: number[], totPage: number) =>
	!pageArr.includes(totPage)
/** 이전 버튼 배열 중, 가장 뒷 번호를 반환합니다. */
export const getPrevBack = (curPage: number, perPage: number) => {
	return Math.floor((curPage - 1) / perPage) * perPage
}
/** 다음 버튼 배열 중, 가장 첫 번호를 반환합니다. */
export const getNextFront = (curPage: number, perPage: number) =>
	Math.floor((curPage - 1) / perPage + 1) * perPage + 1
