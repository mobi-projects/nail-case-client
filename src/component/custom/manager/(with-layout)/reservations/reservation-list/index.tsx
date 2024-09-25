import type { TStatusExcludeCanceled } from "../reservations.type"

import PaginationController from "./pagination-controller"
import ReservationItmeList from "./reservation-itme-list"
import ReservationTableHeader from "./reservation-table-header"

type ReservationListPT = {
	status: TStatusExcludeCanceled
	shopId: number
	page: number
}

export default function ReservationList({
	status,
	page,
	shopId,
}: ReservationListPT) {
	return (
		<div className="grid h-[610px] max-h-[610px] min-h-[610px] w-full grid-rows-[auto_1fr_auto] overflow-y-auto rounded-md border border-Gray20 bg-White shadow-customGray80">
			<ReservationTableHeader focusedStatus={status} />
			<ReservationItmeList page={page} shopId={shopId} status={status} />
			<PaginationController page={page} shopId={shopId} status={status} />
		</div>
	)
}
