import NTIcon from "@/component/common/nt-icon"
import { cn } from "@/config/tailwind"
import type { TReservationListPagination } from "@/util/api-v2/get-list-reservation"

import { getDecomposedDate, getDecomposedHour } from "./reservation-item.util"

type ReservationItemPT = {
	order: number
	reservation: TReservationListPagination
	isClicked: boolean
}

export default function ReservationItem({
	order,
	reservation,
	isClicked,
}: ReservationItemPT) {
	const { customerName, startTime } = reservation
	return (
		<div
			className={cn(
				"relative grid w-full cursor-pointer grid-cols-[1fr_2fr_2fr_2fr] border-y border-Gray20 py-3 transition-all",
				isClicked ? "bg-PB60/10" : "hover:bg-Gray10",
			)}
		>
			<p className="text-center text-Body01 font-SemiBold text-Gray50">
				{order}
			</p>
			<p className="text-center text-Callout">{customerName}</p>
			<p className="text-center text-Callout text-Gray50">
				{getDecomposedDate(startTime)}
			</p>
			<p className="text-center text-Callout">{getDecomposedHour(startTime)}</p>
			<NTIcon
				icon="expandRight"
				className={cn(
					"absolute right-2 top-1/2 h-5 w-5 -translate-y-1/2",
					isClicked ? "text-PB100" : "text-transparent",
				)}
			/>
		</div>
	)
}
