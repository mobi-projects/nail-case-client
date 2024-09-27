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
}

export default function ReservationItmeList({
	page,
	shopId,
	status,
	selectedId,
	setSelectedId,
}: ReservationItmeListPT) {
	const { endDate, startDate } = createDateRange()
	const { data, isError, isLoading } = useListReservation({
		shopId,
		endDate,
		page,
		startDate,
		status,
	})

	if (isLoading)
		return (
			<div className="flex h-full w-full items-center justify-center">
				<NTLoadingSpinner size="small" />
			</div>
		)
	if (isError || isUndefined(data)) return <h1>에러발생</h1> // 추후 수정

	const { reservationList, pageSize } = data

	if (reservationList.length === 0)
		return (
			<div className="h-full w-full content-center text-center text-Title01 font-Bold">
				조회 데이터가 없습니다.
			</div>
		) // ui수정 pr별도로 올리겠습니다.

	return (
		<div>
			{reservationList.map((reservation, idx) => (
				<ReservationItem
					order={getOrderNumber(page, pageSize, idx)}
					key={reservation.reservationId}
					reservation={reservation}
					isClicked={selectedId === reservation.reservationId}
					setSelectedId={setSelectedId}
				/>
			))}
		</div>
	)
}

const getOrderNumber = (page: number, pageSize: number, idx: number) =>
	page * pageSize + idx + 1
