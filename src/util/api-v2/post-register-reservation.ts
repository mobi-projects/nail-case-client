import { axiosInstance } from "@/config/axios"
import type { TResponseData } from "@/type/response"
import type { TNailCondition } from "@/type/union-option/nail-condition"
import type { TNailTreatment } from "@/type/union-option/nail-treatment"
import type { TRemoveOption } from "@/type/union-option/remove-option"

import type {
	TconditionOption,
	Tstatus,
	TTreatmentOption,
} from "./get-main-page-data"

export const postRegisterReservation = async (
	form: TReqReservationForm,
): Promise<TResponseData<TResReservation, "data">> => {
	const response = await axiosInstance().post(
		`/shops/${form.shopId}/reservations`,
		form,
	)

	return response.data
}

export type TReqReservationForm = {
	shopId: number
	startTime: number
	remove: TRemoveOption
	extend: boolean
	conditionList: Array<{
		option: TNailCondition
	}>
	treatment: {
		option: TNailTreatment | null
		imageId?: number
	}
}

export type TResReservation = {
	reservationId: number
	reservationDetailId: number
	remove: TRemoveOption
	extend: false
	status: Tstatus
	startTime: number
	endTime: null
	conditionList: Array<{
		conditionId: 947
		option: TconditionOption
	}>
	treatment: {
		option: TTreatmentOption
		imageId: number | null
		imageUrl?: string | null
	}
	createdAt: number
	modifiedAt: number
}
