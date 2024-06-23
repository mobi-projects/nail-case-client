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

/* ---------V2 --------- */
export type TReservationV2 = {
	reservationId: number // 예약 고유번호
	reservationDetailList: Array<TReservationDetailV2> // 예약 상세
	createAt: number
	modifiedAt: number
}
export type TReservationDetailV2 = {
	reservationDetailId: number // 예약 상세 고유번호
	nailArtistId: number // 아티스트 고유번호, TODO: 아티스트 이름으로 변경해야 합니다.
	remove: TRemoveOption // 네일 제거 옵션
	extend: boolean // 연장 유무
	status: TReservationStatus // 예약 상태
	startTime: number // 시술 시작 시간
	endTime: number // 시술 종료 시간
	conditionList: Array<TNailCondition> // 손톱 상태 목록
	treatmentList: Array<TNailTreatment> // 시술 목록
	createdAt: number
	modifiedAt: number
}
