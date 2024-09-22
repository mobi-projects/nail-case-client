"use client"

import { useState } from "react"

import ReservationDetail from "@/component/custom/manager/(with-layout)/reservations/reservation-detail"
import ReservationList from "@/component/custom/manager/(with-layout)/reservations/reservation-list"
import ReservationsHeader from "@/component/custom/manager/(with-layout)/reservations/reservations-header"

export default function Reservations() {
	const [clickedIdx, setClickedIx] = useState(0)
	return (
		<>
			<ReservationsHeader clickedIdx={clickedIdx} setClickedIx={setClickedIx} />
			<div className="mt-6 grid w-full grid-cols-[1.2fr_1fr] gap-x-6">
				<div>
					<p className="pb-4 text-Title01 font-SemiBold text-Gray70">
						예약 요청
					</p>
					<ReservationList />
				</div>
				<div>
					<p className="pb-4 text-Title01 font-SemiBold text-Gray70">
						예약 상세
					</p>
					<ReservationDetail />
				</div>
			</div>
		</>
	)
}
