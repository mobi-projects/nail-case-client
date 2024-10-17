import { cva } from "class-variance-authority"

import { cn } from "@/config/tailwind"

import type { TStatusExcludeCanceled } from "../../reservations.type"

type ReservationTableHeaderPT = {
	focusedStatus: TStatusExcludeCanceled
}

export default function ReservationTableHeader({
	focusedStatus,
}: ReservationTableHeaderPT) {
	const titleVarinats = cva(
		"rounded-xl px-2 py-[0.5px] text-center text-Callout font-SemiBold text-White shadow-customGray60",
		{
			variants: {
				status: {
					PENDING: "bg-PB70",
					REJECTED: "bg-red-300",
					CONFIRMED: "bg-PURPLE",
					COMPLETED: "bg-GREEN",
				},
			},
		},
	)
	return (
		<div className="grid w-full grid-cols-[1fr_2fr_2fr_2fr] py-3">
			<div className="flex h-fit items-center justify-center">
				<div className={cn(titleVarinats({ status: focusedStatus }))}>
					{translateStatusToKor(focusedStatus)}
				</div>
			</div>
			<p className="text-center text-Body01 font-SemiBold text-Gray80">
				예약자
			</p>
			<p className="text-center text-Body01 font-SemiBold text-Gray80">
				날짜(요일)
			</p>
			<p className="text-center text-Body01 font-SemiBold text-Gray80">시간</p>
		</div>
	)
}

const translateStatusToKor = (status: TStatusExcludeCanceled) => {
	if (status === "COMPLETED") return "완료"
	if (status === "CONFIRMED") return "확정"
	if (status === "PENDING") return "요청"
	if (status === "REJECTED") return "취소"
}
