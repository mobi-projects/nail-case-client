import { axiosInstance } from "@/config/axios"

export const getMainPageData = async (): Promise<TReservationInfo> => {
	const response = await axiosInstance().get("/main")
	return response.data.data.recentReservation
}

export type TReservationInfo = {
	reservationId: number
	shop: TMainPageShop
	details: Array<TMainPageDetail>
}

export type TMainPageShop = {
	id: number
	name: string
	shopImageUrl: string
}
export type TMainPageDetail = {
	reservationDetailsId: number
	startTime: number
	endTime: number | null
	treatmentOptions: Array<TTreatmentOption> // 중복선택 x 배열안에 원소1개로
	removeOption: TRemoveOption
	conditionOptions: Array<TconditionOption>
	status: Tstatus
	estimatedPrice: string | null
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
