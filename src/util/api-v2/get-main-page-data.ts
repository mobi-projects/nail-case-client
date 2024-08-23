import { axiosInstance } from "@/config/axios"
import type { TResponseData } from "@/type/response"

export const getMainPageData = async (): Promise<
	TResponseData<TResMainPageData, "data">
> => {
	const response = await axiosInstance().get("/main")
	return response.data.data
}

export type TResMainPageData = {
	recentReservation: TReservationInfo
}

export type TReservationInfo = {
	reservationId: number
	shop: TMainPageShop
	details: Array<TMainPageDetail>
}

export type TMainPageShop = {
	id: number
	name: string
	imageSrc: string
}
export type TMainPageDetail = {
	reservationDetailsId: number
	startTime: number
	endTime: number | null
	treatmentOption: Array<TTreatmentOption> // 중복선택 x 배열안에 원소1개로
	removeOption: TRemoveOption
	conditionOptions: Array<TconditionOption>
	status: Tstatus
}
export type TconditionOption = "REPAIR" | "AS" | "WOUND_CARE" | "CORRECTION"
export type Tstatus =
	| "PENDING"
	| "CANCELED"
	| "REJECTED"
	| "CONFIRMED"
	| "COMPLETED"
export type TRemoveOption = "IN_SHOP" | "ELSE_WHERE" | "NO_NEED"

export type TTreatmentOption = "AOM" | "CARE" | "ONE" | "MEMBER_IMAGE"
