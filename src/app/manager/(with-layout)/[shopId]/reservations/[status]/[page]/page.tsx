"use client"

import { useState } from "react"

import ReservationDetail from "@/component/custom/manager/(with-layout)/reservations/reservation-detail"
import ReservationList from "@/component/custom/manager/(with-layout)/reservations/reservation-list"
import { translateStatus } from "@/component/custom/manager/(with-layout)/reservations/reservations,util"
import ReservationsHeader from "@/component/custom/manager/(with-layout)/reservations/reservations-header"
import type { TStatusExcludeCanceled } from "@/component/custom/manager/(with-layout)/reservations/reservations.type"

type ReservationsPT = {
	params: { shopId: string; page: string; status: TStatusExcludeCanceled }
}

export default function Reservations({ params }: ReservationsPT) {
	const { page, shopId, status } = params
	const [selectedId, setSelectedId] = useState(-1)
	return (
		<>
			<ReservationsHeader status={status} />
			<div className="mt-6 grid w-full grid-cols-[1.2fr_1fr] gap-x-6 max-lg:flex max-lg:flex-col max-lg:gap-y-5 max-lg:pl-3 max-lg:pr-6">
				<div>
					<p className="pb-4 text-Title01 font-SemiBold text-Gray60">
						{translateStatus(status)}
					</p>
					<ReservationList
						status={status}
						page={parseInt(page) - 1}
						shopId={parseInt(shopId)}
						selectedId={selectedId}
						setSelectedId={setSelectedId}
					/>
				</div>
				<div>
					<p className="pb-4 text-Title01 font-SemiBold text-Gray60">
						예약 상세
					</p>
					<ReservationDetail
						selectedId={selectedId}
						shopId={parseInt(shopId)}
						status={status}
					/>
				</div>
			</div>
		</>
	)
}
