export type ApprovalModalPT = {
	shopId: number
	reservationId: number
	startTime: number
	optionArr: string[][]
	companion: number
	reservationDetailIdArr: number[]
}

export type useScheduleConfirmMutationFnPT = {
	shopId: number
	reservationId: number
	reqBody: TReservationDetailList
}

export type TReservationDetailList = {
	reservationDetailList: TReservationDetail[]
}

export type TReservationDetail = {
	reservationDetailId: number
	startTime: number
	endTime: number
}
