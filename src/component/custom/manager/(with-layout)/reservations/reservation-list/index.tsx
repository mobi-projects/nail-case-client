import type { Dispatch, SetStateAction } from "react"

import type { TStatusExcludeCanceled } from "../reservations.type"

import PaginationController from "./pagination-controller"
import ReservationItmeList from "./reservation-itme-list"
import ReservationTableHeader from "./reservation-table-header"

type ReservationListPT = {
	status: TStatusExcludeCanceled
	shopId: number
	page: number
	selectedId: number
	setSelectedId: Dispatch<SetStateAction<number>>
	setIsOpen: Dispatch<SetStateAction<boolean>>
}

export default function ReservationList({
	status,
	page,
	shopId,
	selectedId,
	setSelectedId,
	setIsOpen,
}: ReservationListPT) {
	return (
		<div className="scrollbar grid h-[610px] max-h-[610px] min-h-[610px] w-full grid-rows-[auto_1fr_auto] overflow-y-auto rounded-md border border-Gray20 bg-White shadow-customGray80 max-lg:h-[80dvh] max-lg:max-h-full">
			<ReservationTableHeader focusedStatus={status} />
			<ReservationItmeList
				page={page}
				shopId={shopId}
				status={status}
				selectedId={selectedId}
				setSelectedId={setSelectedId}
				setIsOpen={setIsOpen}
			/>
			<PaginationController page={page} shopId={shopId} status={status} />
		</div>
	)
}
