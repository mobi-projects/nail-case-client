"use client"

import { useState } from "react"

import ReservationDetail from "@/component/custom/manager/(with-layout)/reservations/reservation-detail"
import ReservationList from "@/component/custom/manager/(with-layout)/reservations/reservation-list"
import ReservationsHeader from "@/component/custom/manager/(with-layout)/reservations/reservations-header"
import {
	STATUS_PAIR,
	STATUS_WITHOUT_CANCELED_ARR,
} from "@/component/custom/manager/(with-layout)/reservations/reservations.constant"
import type { TStatusExcludeCanceled } from "@/component/custom/manager/(with-layout)/reservations/reservations.type"

export default function Reservations() {
	const [focusedStatus, setFocusedStatus] = useState<TStatusExcludeCanceled>(
		STATUS_WITHOUT_CANCELED_ARR[0],
	)
	return (
		<>
			<ReservationsHeader
				focusedStatus={focusedStatus}
				setFocusedStatus={setFocusedStatus}
			/>
			<div className="mt-6 grid w-full grid-cols-[1.2fr_1fr] gap-x-6">
				<div>
					<p className="pb-4 text-Title01 font-SemiBold text-Gray60">
						{translateStatus(focusedStatus)}
					</p>
					<ReservationList focusedStatus={focusedStatus} />
				</div>
				<div>
					<p className="pb-4 text-Title01 font-SemiBold text-Gray60">
						예약 상세
					</p>
					<ReservationDetail />
				</div>
			</div>
		</>
	)
}

export const translateStatus = (status: TStatusExcludeCanceled) =>
	STATUS_PAIR[status]
