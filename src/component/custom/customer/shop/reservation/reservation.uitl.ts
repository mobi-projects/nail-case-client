import { decomposeStamp, getKSTStamp } from "@/util/common"

import type { TReservationForm } from "./memorized-options"

export const getIntialReservationForm = (shopId: number): TReservationForm => {
	return {
		shopId: shopId,
		startTime: -1,
		remove: "NO_NEED",
		extend: false,
		conditionList: [],
		treatment: { option: null },
	}
}
/** 예약정보 유효성검사  */
export const isValidReservationForm = (time: number, form: TReservationForm) =>
	time === -1 ||
	form.conditionList.length === 0 ||
	form.treatment.option === null

/** 선택된 option들을 조합해서 하나의 reservationForm으로 조합 */
export const createReservationForm = (
	dateStamp: number,
	timeStamp: number,
	form: TReservationForm,
	shopId: number,
): TReservationForm => {
	const { year, month, date } = decomposeStamp(dateStamp)
	const { hour, min } = decomposeStamp(timeStamp)
	const combinedStamp = getKSTStamp(year, month, date, hour, min)

	return {
		...form,
		startTime: combinedStamp,
		shopId: shopId,
	}
}
