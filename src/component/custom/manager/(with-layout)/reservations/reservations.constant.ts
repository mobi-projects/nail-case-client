import type { TStatusExcludeCanceled } from "./reservations.type"

export const STATUS_WITHOUT_CANCELED_ARR: Array<TStatusExcludeCanceled> = [
	"PENDING",
	"CONFIRMED",
	"COMPLETED",
	"REJECTED",
]

export const STATUS_PAIR = {
	PENDING: "예약 요청",
	COMPLETED: "시술 완료",
	REJECTED: "취소된 요청",
	CONFIRMED: "예약 확정",
}
