import type { TReqReservationForm } from "@/util/api/post-register-reservation"
import { decomposeStamp, getKSTStamp } from "@/util/common"

export const getIntialReservationForm = (
	shopId: number,
): TReqReservationForm => {
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
export const isValidReservationForm = (
	time: number,
	form: TReqReservationForm,
) =>
	time === -1 ||
	form.conditionList.length === 0 ||
	form.treatment.option === null

/** 선택된 option들을 조합해서 하나의 reservationForm으로 조합 */
export const createReservationForm = (
	dateStamp: number,
	timeStamp: number,
	form: TReqReservationForm,
	shopId: number,
): TReqReservationForm => {
	const { year, month, date } = decomposeStamp(dateStamp)
	const { hour, min } = decomposeStamp(timeStamp)
	const combinedStamp = getKSTStamp(year, month, date, hour, min)

	return {
		...form,
		startTime: combinedStamp,
		shopId: shopId,
	}
}
