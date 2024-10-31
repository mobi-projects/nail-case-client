import type { TResViewReservation } from "@/util/api/get-reservation-detail"
type RejectReasonPT = {
	reservation: TResViewReservation
}

export default function RejectReason({ reservation }: RejectReasonPT) {
	return (
		<div className="flex min-h-[70px] w-full items-center gap-x-4 border-b border-Gray20 pl-12 max-md:pl-4">
			<p className="min-w-[5.5rem] text-Body02 font-Bold text-red-500 max-md:min-w-[4rem]">
				취소 사유
			</p>
			<div className="line-clamp-2 text-Body02 font-SemiBold text-red-400">
				{reservation.rejectReason}
			</div>
		</div>
	)
}
