import type { TNailCondition } from "@/type/union-option/nail-condition"
import type { TNailTreatment } from "@/type/union-option/nail-treatment"
import type { TRemoveOption } from "@/type/union-option/remove-option"
import type { TReservationStatus } from "@/type/union-option/resesrvation-status"

export const getListReservation = () => {}
export type TReqGetListReservation = {
	startDate: number
	endDate: number
	status: TReservationStatus
}
export type TResGetListReservation = TReservation[]

export type TReservation = {
	id: number
	nickname: string
	startTime: number
	endTime: number | null
	status: TReservationStatus
	treatmentDetail: {
		options: TNailTreatment[]
		images: TTreatmentImage[] | null
	}
	remove: TRemoveOption
	extend: boolean
	conditionOptions: TNailCondition[] | null
}

export type TTreatmentImage = {
	imageUrl: string
	imageId: number
}
