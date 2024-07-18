"use client"
import { useQuery } from "@tanstack/react-query"

import NTLoadingSpinner from "@/component/common/nt-loading-spinner"
import { managerQuery } from "@/config/tanstack-query/key-factory"
import type { TReservationStatus } from "@/type/union-option/resesrvation-status"
import { isUndefined } from "@/util/common/type-guard"

import OnError from "../error-fallback"
import ExpandableSection from "../expandable-section"

import ReservationItem from "./reservation-item"

type ReservationListPT = {
	shopId: number
	status: TReservationStatus
	statusIdx: number
}

const SECTION_TITLE_ARR = [
	"예약대기",
	"예약승인",
	"최근 30일동안 완료한 시술",
	"최근 30일동안 거절한 예약",
] as const

export default function ReservationList({
	shopId,
	status,
	statusIdx,
}: ReservationListPT) {
	const { data, isLoading, isError } = useQuery(
		managerQuery.scheduleList(shopId),
	)
	if (isLoading) {
		return (
			<ExpandableSection title={`${SECTION_TITLE_ARR[statusIdx]}`}>
				<div className="flex h-full w-full items-center justify-center">
					<NTLoadingSpinner />
				</div>
			</ExpandableSection>
		)
	}
	if (isError || isUndefined(data)) {
		return (
			<ExpandableSection title={`${SECTION_TITLE_ARR[statusIdx]}`}>
				<OnError />
			</ExpandableSection>
		)
	}
	const reservationList = data[statusIdx].dataList
	return (
		<ExpandableSection title={`${SECTION_TITLE_ARR[statusIdx]}`}>
			<div className="flex w-full flex-col gap-[22px]">
				{reservationList.map((reservation) => (
					<ReservationItem
						key={reservation.reservationId}
						{...{ reservation, status, shopId }}
					/>
				))}
			</div>
		</ExpandableSection>
	)
}
