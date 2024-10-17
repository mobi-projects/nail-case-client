import { useQueryClient } from "@tanstack/react-query"
import { cva } from "class-variance-authority"
import { useEffect, type Dispatch, type SetStateAction } from "react"

import NTIcon from "@/component/common/nt-icon"
import { cn } from "@/config/tailwind"
import type { TReservationListPagination } from "@/util/api/get-list-reservation"
import { prefetchResercationDetail } from "@/util/api/get-reservation-detail"

import type { TStatusExcludeCanceled } from "../../../reservations.type"

import { getDecomposedDate, getDecomposedTIme } from "./reservation-item.util"

type ReservationItemPT = {
	order: number
	reservation: TReservationListPagination
	isClicked: boolean
	setSelectedId: Dispatch<SetStateAction<number>>
	shopId: number
	status: TStatusExcludeCanceled
}

export default function ReservationItem({
	order,
	reservation,
	isClicked,
	setSelectedId,
	shopId,
	status,
}: ReservationItemPT) {
	const queryClient = useQueryClient()

	const { customerName, startTime, reservationId } = reservation
	const arrowVarinats = cva(
		"absolute right-2 top-1/2 h-5 w-5 -translate-y-1/2",
		{
			variants: {
				status: {
					PENDING: "text-PB70",
					REJECTED: "text-red-300",
					CONFIRMED: "text-PURPLE",
					COMPLETED: "text-GREEN",
				},
			},
		},
	)
	useEffect(() => {
		if (order % 10 === 1) return setSelectedId(reservationId)
	}, [order, reservationId, setSelectedId])
	const { division, hour, min } = getDecomposedTIme(startTime)
	return (
		<div
			onClick={() => setSelectedId(reservationId)}
			onMouseEnter={async () => {
				await prefetchResercationDetail(queryClient, shopId, reservationId)
			}}
			className={cn(
				"scrollbar relative grid w-full cursor-pointer grid-cols-[1fr_2fr_2fr_2fr] overflow-y-auto border-y border-Gray20 py-3 transition-all",
				isClicked ? "bg-PB60/10" : "hover:bg-Gray10",
			)}
		>
			<p className="text-center text-Body01 font-SemiBold text-Gray50">
				{order}
			</p>
			<p className="text-center text-Callout">{customerName}</p>
			<p className="text-center text-Callout text-Gray50">
				{getDecomposedDate(startTime)}
			</p>
			<div className="flex items-center justify-center text-Callout font-SemiBold">
				<span className="px-1 font-SemiBold text-Gray50">{`(${division})`}</span>
				<p className="w-5 text-center">{hour}</p> <span>:</span>
				<p className="w-5 text-center">{min}</p>
			</div>
			<NTIcon
				icon="expandRight"
				className={cn(
					arrowVarinats({ status }),
					!isClicked && "text-transparent",
				)}
			/>
		</div>
	)
}
