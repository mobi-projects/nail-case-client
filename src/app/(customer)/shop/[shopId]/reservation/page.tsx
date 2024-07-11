"use client"
import { useState } from "react"

import { NTButton } from "@/component/common/atom/nt-button"
import CustomerShopReservationHeader from "@/component/custom/customer/shop/reservation/01"
import Companion from "@/component/custom/customer/shop/reservation/02"
import Artist from "@/component/custom/customer/shop/reservation/03"
import TreatmentNCondition from "@/component/custom/customer/shop/reservation/04"
import ScheduleSelection from "@/component/custom/customer/shop/reservation/05"
import { ExpandableToggle } from "@/component/custom/customer/shop/reservation/common/expandable-toggle"

type CustomerShopPT = {
	params: {
		shopId: number
	}
}

export default function CustomerShopReservation({ params }: CustomerShopPT) {
	const { shopId } = params
	const [companion, setCompanion] = useState(1)
	const [artistIdArr, setArtistIdArr] = useState<number[]>([])

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
					<TreatmentNCondition />
				</ExpandableToggle>
				<ExpandableToggle title="시술 일정">
					<ScheduleSelection shopId={shopId} />
				</ExpandableToggle>
			</div>

			<div className="my-[100px] flex h-fit w-full items-center justify-center">
				<NTButton disabled>예약하기</NTButton>
			</div>
		</main>
	)
}
