export type TReservationStatus =
	| "PENDING" // 예약 대기
	| "CANCELED" // 예약 취소, 소비자 주도
	| "REJECTED" // 예약 거절, 판매자 주도
	| "CONFIRMED" // 예약 승인
	| "COMPLETED"
