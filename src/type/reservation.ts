import type { TSchedule } from "./schedule"
import type { TNTTime } from "./time"
import type { TNailCondition } from "./union-option/nail-condition"
import type { TNailTreatment } from "./union-option/nail-treatment"
import type { TRemoveOption } from "./union-option/remove-option"
import type { TReservationStatus } from "./union-option/resesrvation-status"
import type { TArtist, TCustomer } from "./user"

export type TReservation = {
	id: number
	status: TReservationStatus
	artistArr: TArtist[]
	customer: TCustomer
	schedule: TSchedule
	companion: number
	essentialDetailArr: TEssentialForm[]
	customDetailArr: TCustomForm[]
}

export type TEssentialForm = {
	reservationDate: TNTTime
	treatment: TNailTreatment
	removalReq: TRemoveOption
	extensionReq: boolean
	conditionArr: TNailCondition[]
}
export type TCustomForm = {
	// TODO: 추후작성
}

export type TReqBodyUpdateReservation = {
	status: TReservationStatus
	reservationDetailDtoList: Array<{
		reservationDetailId: number
		nailArtistId: number | null
	}>
}
/* Response */
export type TResGetListReservation = {
	reservationId: number
	nickname: string
	reservationDetailList: Array<TReservationDetail>
	createdAt: number
	modifiedAt: number
}

export type TListReservationDetail = {
	reservationDetailId: number
	nailArtistId: number | null
	remove: TRemoveOption
	extend: boolean
	status: TReservationStatus
	startTime: number
	endTime: number | null
	conditionList: Array<{
		conditionId: number
		option: TNailCondition
		createdAt: number
		modifiedAt: number
		createdBy: string
		modifiedBy: string
	}>
	treatmentList: Array<{
		option: TNailTreatment
		imageId: number
		imageUrl: string
		createdAt: number
		modifiedAt: number
		createdBy: string
		modifiedBy: string
	}>
	createdAt: number
	modifiedAt: number
}

export type TReservationDetail = {
	reservationDetailId: number
	nailArtistId: number
	remove: TRemoveOption
	extend: boolean
	status: TReservationStatus
	startTime: number
	endTime: number
	conditionList: Array<{
		conditionId: number
		option: TNailCondition
		createdAt: number
		modifiedAt: number
		createdBy: string
		modifiedBy: string
	}>
	treatmentList: Array<{
		option: TNailTreatment
		imageId: number
		imageUrl: string
		createdAt: number
		modifiedAt: number
		createdBy: string
		modifiedBy: string
	}>
	createdAt: number
	modifiedAt: number
}

export type TResPostRegisterReservation = {
	reservationId: number
	reservationDetailList: Array<TReservationDetail>
	createdAt: number
	modifiedAt: number
}
export type TResGetViewReservation = {
	reservationId: number
	reservationDetailList: Array<{
		reservationDetailId: number
		nailArtistId: number
		remove: TRemoveOption
		extend: boolean
		status: TReservationStatus
		startTime: number
		endTime: number
		conditionList: Array<{
			conditionId: number
			option: TNailCondition
			createdAt: number
			modifiedAt: number
			createdBy: string
			modifiedBy: string
		}>
		treatmentList: Array<{
			option: TNailTreatment
			imageId: number
			imageUrl: string
			createdAt: number
			modifiedAt: number
			createdBy: string
			modifiedBy: string
		}>
		createdAt: number
		modifiedAt: number
	}>
	createdAt: number
	modifiedAt: number
}
export type TResUpdateReservation = {
	reservationId: number
	reservationDetailList: Array<{
		reservationDetailId: number
		nailArtistId: number
		remove: TRemoveOption
		extend: boolean
		status: TReservationStatus
		startTime: number
		endTime: number
		conditionList: Array<{
			conditionId: number
			option: TNailCondition
			createdAt: number
			modifiedAt: number
			createdBy: string
			modifiedBy: string
		}>
		treatmentList: Array<{
			option: TNailTreatment
			imageId: number
			imageUrl: string
			createdAt: number
			modifiedAt: number
			createdBy: string
			modifiedBy: string
		}>
		createdAt: number
		modifiedAt: number
	}>
	createdAt: number
	modifiedAt: number
}
export type TReservationDetailList = {
	reservationDetailId: number
	nailArtistId: number
	remove: TRemoveOption
	extend: boolean
	status: TReservationStatus
	startTime: number
	endTime: number
	conditionList: Array<{
		conditionId: number
		option: TNailCondition
		createdAt: number
		modifiedAt: number
		createdBy: string
		modifiedBy: string
	}>
	treatmentList: Array<{
		option: TNailTreatment
		imageId: number
		imageUrl: string
		createdAt: number
		modifiedAt: number
		createdBy: string
		modifiedBy: string
	}>
}
export type TResGetListAvailableTime = {
	startTime: number
	availableSeats: number
	artists: Array<{
		id: number
		nickname: string
		enable: boolean
		near: number | null
	}>
}
