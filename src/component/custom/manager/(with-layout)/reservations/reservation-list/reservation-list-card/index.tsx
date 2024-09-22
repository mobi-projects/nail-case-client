import type { ReactNode } from "react"

type ReservationListCardPT = {
	children: ReactNode
}
export default function ReservationListCard({
	children,
}: ReservationListCardPT) {
	return (
		<div className="flex h-[610px] max-h-[610px] min-h-[610px] w-full flex-col overflow-y-auto rounded-md border border-Gray20 bg-White shadow-customGray80">
			{children}
		</div>
	)
}

/**
 *  PENDING : "새 예약 요청" //	pending: "iconoir:new-tab",
 *  COMPLETED : "시술 완료"  // completed: "ant-design:file-done-outlined",
 *  REJECTED : "취소된 요청"  //cancel:"iconoir:cancel"
 *  CONFIRMED : "예약 확정" 	// confirmed: "line-md:confirm-circle",
 *
 */
