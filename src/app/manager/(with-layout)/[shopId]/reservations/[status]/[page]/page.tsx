"use client"

import { useState } from "react"

import ReservationDetail from "@/component/custom/manager/(with-layout)/reservations/reservation-detail"
import ReservationList from "@/component/custom/manager/(with-layout)/reservations/reservation-list"
import { translateStatus } from "@/component/custom/manager/(with-layout)/reservations/reservations,util"
import ReservationsHeader from "@/component/custom/manager/(with-layout)/reservations/reservations-header"
import type { TStatusExcludeCanceled } from "@/component/custom/manager/(with-layout)/reservations/reservations.type"
import { cn } from "@/config/tailwind"

type ReservationsPT = {
	params: { shopId: string; page: string; status: TStatusExcludeCanceled }
}

export default function Reservations({ params }: ReservationsPT) {
	const { page, shopId, status } = params
	const [selectedId, setSelectedId] = useState(-1)
	const [isOpen, setIsOpen] = useState(false)
	return (
		<div className="relative">
			<ReservationsHeader status={status} />
			<div className="mt-6 grid w-full grid-cols-[1.2fr_1fr] gap-x-6 lg:px-10 max-md:px-2 max-lg:flex max-lg:flex-col max-lg:gap-y-5">
				<div>
					<p className="pb-4 text-Title01 font-SemiBold text-Gray60 lg:text-[20px] max-md:text-[18px]">
						{translateStatus(status)}
					</p>
					<ReservationList
						status={status}
						page={parseInt(page) - 1}
						shopId={parseInt(shopId)}
						selectedId={selectedId}
						setSelectedId={setSelectedId}
						setIsOpen={setIsOpen}
					/>
				</div>
				<div
					className={cn(
						"transition-all duration-500 max-lg:absolute max-lg:top-0",
						isOpen
							? "max-lg:translate-x-0"
							: "max-lg:translate-x-full max-lg:opacity-0",
					)}
				>
					<p className="pb-4 text-Title01 font-SemiBold text-Gray60 lg:text-[20px] max-md:text-[18px] max-lg:opacity-0">
						예약 상세
					</p>
					<ReservationDetail
						selectedId={selectedId}
						shopId={parseInt(shopId)}
						status={status}
						setIsOpen={setIsOpen}
					/>
				</div>
			</div>
		</div>
	)
}
