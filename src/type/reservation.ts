import type { TSchedule } from "./schedule"
import type { TNTTime } from "./time"
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
	removalReq: TNailRemovalReq
	extensionReq: boolean
	conditionArr: TNailCondition[]
}
export type TCustomForm = {
	// TODO: 추후작성
}

export type TReservationStatus =
	| "WAITING"
	| "APPROVAL"
	| "CANCELED"
	| "REJECTED"
export type TNailTreatment = "AOM" | "CARE" | "ONE" | "PICTURE"
export type TNailRemovalReq = "IN-SHOP" | "ELSE-WHERE" | "NO-NEED"
export type TNailCondition = "REPAIR" | "AS" | "WOUND_CARE" | "CORRECTION"
