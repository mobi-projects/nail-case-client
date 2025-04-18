import { cva } from "class-variance-authority"

import NTLoadingSpinner from "@/component/common/nt-loading-spinner"
import { cn } from "@/config/tailwind"

import type { TStatusExcludeCanceled } from "../../reservations.type"

type ReservationDetailSkeletonPT = {
	status: TStatusExcludeCanceled
}

export default function ReservationDetailSkeleton({
	status,
}: ReservationDetailSkeletonPT) {
	const titleVarinats = cva("py-5 pl-4 text-Title03 font-Bold", {
		variants: {
			status: {
				PENDING: "text-PB70",
				REJECTED: "text-red-300",
				CONFIRMED: "text-PURPLE50",
				COMPLETED: "text-GREEN50",
			},
		},
	})
	const reservationIdVarinats = cva(
		"mr-4 h-fit w-fit rounded-full px-3 py-1 text-Body01 font-SemiBold text-White",
		{
			variants: {
				status: {
					PENDING: "bg-PB70",
					REJECTED: "bg-red-300",
					CONFIRMED: "bg-PURPLE50",
					COMPLETED: "bg-GREEN50",
				},
			},
		},
	)

	return (
		<div className="grid h-[610px] max-h-[610px] min-h-[610px] w-full grid-rows-[1fr_6fr_1fr_1fr] rounded-md border border-Gray20 bg-White shadow-customGray80">
			<div className="flex h-fit w-full items-center justify-between bg-Gray10">
				<p className={cn(titleVarinats({ status }))}>예약 정보 확인</p>
				<p className={cn(reservationIdVarinats({ status }))}>예약번호 : #</p>
			</div>
			<div className="flex h-full w-full items-center justify-center pt-12">
				<NTLoadingSpinner size="small" />
			</div>
		</div>
	)
}
