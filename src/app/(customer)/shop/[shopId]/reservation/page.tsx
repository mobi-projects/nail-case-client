"use client"
import { useEffect, useState } from "react"

import { NTButton } from "@/component/common/atom/nt-button"
import CustomerShopReservationHeader from "@/component/custom/customer/shop/reservation/01"
import Companion from "@/component/custom/customer/shop/reservation/02"
import Artist from "@/component/custom/customer/shop/reservation/03"
import TreatmentNCondition from "@/component/custom/customer/shop/reservation/04"
import ScheduleSelection from "@/component/custom/customer/shop/reservation/05"
import { ExpandableToggle } from "@/component/custom/customer/shop/reservation/common/expandable-toggle"
import type { TNailCondition } from "@/type/union-option/nail-condition"
import type { TNailTreatment } from "@/type/union-option/nail-treatment"
import type { TRemoveOption } from "@/type/union-option/remove-option"
import { getNowStamp } from "@/util/common"

type CustomerShopPT = {
	params: {
		shopId: number
	}
}
export type TReservationForm = {
	shopId: number
	startTime: number
	remove: TRemoveOption
	extend: boolean
	conditionList: {
		option: TNailCondition
	}[]
	treatmentList: {
		option: TNailTreatment
	}[]
}
const initialReservationForm: TReservationForm = {
	shopId: -1,
	startTime: -1,
	remove: "NO_NEED",
	extend: false,
	conditionList: [],
	treatmentList: [],
}

export default function CustomerShopReservation({ params }: CustomerShopPT) {
	const { shopId } = params
	const [companion, setCompanion] = useState(1)
	const [artistIdArr, setArtistIdArr] = useState<number[]>([])
	const [reservationFormArr, setReservationFormArr] = useState<
		TReservationForm[]
	>([initialReservationForm])
	const [selectedStamp, setSelectedStamp] = useState(getNowStamp())

	useEffect(() => {
		setReservationFormArr((prev) => {
			const _prev = [...prev]
			while (_prev.length < companion) _prev.push(initialReservationForm)
			while (_prev.length > companion) _prev.pop()
			return _prev
		})
	}, [companion])

	return (
		<main className="h-fit w-full">
			<CustomerShopReservationHeader name="모비네일 한남" />
			<div className="flex h-fit w-full flex-col gap-[30px] py-4">
				<ExpandableToggle title="동반 인원">
					<Companion {...{ companion, setCompanion }} />
				</ExpandableToggle>
				<ExpandableToggle title="아티스트">
					<Artist
						{...{
							shopId,
							companion,
							artistIdArr,
							setArtistIdArr,
						}}
					/>
				</ExpandableToggle>
				<ExpandableToggle title="시술 세부 내용">
					<TreatmentNCondition
						{...{ companion, reservationFormArr, setReservationFormArr }}
					/>
				</ExpandableToggle>
				<ExpandableToggle title="시술 일정">
					<ScheduleSelection {...{ shopId, selectedStamp, setSelectedStamp }} />
				</ExpandableToggle>
			</div>

			<div className="my-[100px] flex h-fit w-full items-center justify-center">
				<NTButton disabled>예약하기</NTButton>
			</div>
		</main>
	)
}
