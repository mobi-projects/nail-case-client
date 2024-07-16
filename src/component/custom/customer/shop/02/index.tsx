"use client"

import { useRouter } from "next/navigation"
import type { Dispatch, SetStateAction } from "react"
import { useState } from "react"

import { NTButton } from "@/component/common/atom/nt-button"
import { getNowStamp } from "@/util/common"

export default function ReservationSchedule({ shopId }: { shopId: number }) {
	const [clickedStamp, setClickedStamp] = useState(getNowStamp())

	return <ReservationCalendar {...{ clickedStamp, setClickedStamp, shopId }} />
}
type ReservationScheduleSubComponentPT = {
	clickedStamp: number
	setClickedStamp: Dispatch<SetStateAction<number>>
	shopId: number
}

function ReservationCalendar({ shopId }: ReservationScheduleSubComponentPT) {
	const router = useRouter()
	return (
		<NTButton
			variant="tertiary"
			flexible="full"
			size="small"
			onClick={() => {
				router.push(`/shop/${shopId}/reservation`)
			}}
		>
			예약하기
		</NTButton>
	)
}
