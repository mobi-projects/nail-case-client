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

export const isValidReservationForm = (time: number, form: TReservationForm) =>
	time === -1 ||
	form.conditionList.length === 0 ||
	form.treatment.option === null
