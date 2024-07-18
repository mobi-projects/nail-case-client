import type { TResGetListReservation } from "@/type"
import type { TReservationStatus } from "@/type/union-option/resesrvation-status"

import ReservationItem from "./reservation-item"

type ReservationListPT = {
	reservationList: TResGetListReservation[]
	status: TReservationStatus
}
export default function ReservationList({
	reservationList,
	status,
}: ReservationListPT) {
	return (
		<div className="flex w-full flex-col gap-[22px]">
			{reservationList.map((reservation) => (
				<ReservationItem
					key={reservation.reservationId}
					{...{ reservation, status }}
				/>
			))}
		</div>
	)
}
