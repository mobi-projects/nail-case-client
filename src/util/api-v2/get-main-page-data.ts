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
}
export type TMainPageDetail = {
	reservationDetailsId: number
	startTime: number
	endTime: number
	treatmentOptions: Array<TTreatmentOptions>
	removeOption: TRemoveOption
	conditionOptions: Array<TconditionOption>
	accompanied: boolean
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

export type TTreatmentOptions = "AOM" | "CARE" | "ONE" | "MEMBER_IMAGE"
