"use client"
import { useState } from "react"

import { cn } from "@/config/tailwind"
import type { TReservationStatus } from "@/type/union-option/resesrvation-status"
import type { TReservation } from "@/util/api-v2/list-reservation"

import { ListBody } from "./list-body"
import ListHeader from "./list-header"
import { CHILDREN_ANIMATION } from "./reservation-list.constant"

type ReservationListPT = {
	listTitle: string
	status: TReservationStatus
	reservationList: TReservation[]
}
export default function ReservationList({
	listTitle,
	status,
	reservationList,
}: ReservationListPT) {
	const [isExpanded, setIsExpanded] = useState(false)
	const [animationClass, setAnimationClass] = useState<string>(
		CHILDREN_ANIMATION.idle,
	)

	const listSize = reservationList.length

	const onHandleExpansion = () => {
		if (!isExpanded) {
			setIsExpanded(true)
			setAnimationClass(CHILDREN_ANIMATION.entered)
		} else {
			setAnimationClass(CHILDREN_ANIMATION.idle)
			setTimeout(() => {
				setIsExpanded(false)
			}, 150)
		}
	}
	return (
		<section className="relative h-fit min-h-[65px] w-full rounded-[18px]">
			<ListHeader
				{...{ isExpanded, onHandleExpansion, listTitle }}
				listCnt={listSize}
			/>
			<div className={cn("transition-all duration-150", animationClass)}>
				<ListBody {...{ reservationList, status }} />
			</div>
		</section>
	)
}
