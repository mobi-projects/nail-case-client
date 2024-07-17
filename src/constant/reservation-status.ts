import type { TReservationStatus } from "@/type/union-option/resesrvation-status"

export const RESERVATION_STATUS: { [key in TReservationStatus]: string } = {
	PENDING: "예약 대기",
	CANCELED: "예약 취소",
	REJECTED: "예약 거절",
	CONFIRMED: "예약 승인",
	COMPLETED: "시술 끝",
} as const
