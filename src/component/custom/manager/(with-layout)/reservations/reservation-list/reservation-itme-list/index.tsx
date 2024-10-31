import { type Dispatch, type SetStateAction } from "react"

import NTLoadingSpinner from "@/component/common/nt-loading-spinner"
import { useListReservation } from "@/hook/use-reservation-controller"
import { isUndefined } from "@/util/common/type-guard"

import { createDateRange } from "../../reservations,util"
import type { TStatusExcludeCanceled } from "../../reservations.type"

import ReservationItem from "./reservation-item"

type ReservationItmeListPT = {
	page: number
	shopId: number
	status: TStatusExcludeCanceled
	selectedId: number
	setSelectedId: Dispatch<SetStateAction<number>>
	setIsOpen: Dispatch<SetStateAction<boolean>>
}

export default function ReservationItmeList({
	page,
	shopId,
	status,
	selectedId,
	setSelectedId,
	setIsOpen,
}: ReservationItmeListPT) {
	const { endDate, startDate } = createDateRange()
	const { data, isError, isLoading } = useListReservation({
		shopId,
		endDate,
		page,
		startDate,
		status,
	})

	if (isLoading) return <Loading />
	if (isError || isUndefined(data)) return <Error />

	const { reservationList, pageSize } = data

	if (reservationList.length === 0) return <HasNoData />

	return (
		<div>
			{reservationList.map((reservation, idx) => (
				<ReservationItem
					order={getOrderNumber(page, pageSize, idx)}
					key={reservation.reservationId}
					reservation={reservation}
					isClicked={selectedId === reservation.reservationId}
					setSelectedId={setSelectedId}
					shopId={shopId}
					status={status}
					setIsOpen={setIsOpen}
				/>
			))}
		</div>
	)
}

const getOrderNumber = (page: number, pageSize: number, idx: number) =>
	page * pageSize + idx + 1

function Loading() {
	return (
		<div className="flex h-full w-full items-center justify-center">
			<NTLoadingSpinner size="small" />
		</div>
	)
}
function Error() {
	return (
		<div className="flex h-full w-full items-center justify-center text-Title01 font-Bold text-Gray50">
			데이터를 불러오지 못했습니다.
		</div>
	)
}

function HasNoData() {
	return (
		<div className="flex h-full w-full items-center justify-center text-Title01 font-Bold text-Gray50">
			표시할 예약 정보가 없습니다.
		</div>
	)
}
