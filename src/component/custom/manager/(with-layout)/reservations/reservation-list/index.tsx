import { getNowStamp } from "@/util/common"

import type { TStatusExcludeCanceled } from "../reservations.type"

import PaginationController from "./pagination-controller"
import ReservationItem from "./reservation-item"
import ReservationListCard from "./reservation-list-card"
import ReservationTableHeader from "./reservation-table-header"

type ReservationListPT = {
	focusedStatus: TStatusExcludeCanceled
}

export default function ReservationList({ focusedStatus }: ReservationListPT) {
	return (
		<ReservationListCard>
			<ReservationTableHeader focusedStatus={focusedStatus} />
			{Array.from({ length: 10 }, (_, idx) => (
				<ReservationItem
					order={idx + 1}
					key={idx}
					name="홍길동"
					time={getNowStamp()}
					isClicked={idx === 0}
				/>
			))}
			<PaginationController />
		</ReservationListCard>
	)
}
