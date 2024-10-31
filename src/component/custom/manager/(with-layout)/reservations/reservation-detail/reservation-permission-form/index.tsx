import type { Dispatch, MutableRefObject, SetStateAction } from "react"
import { useEffect } from "react"

import { NTPulldownProvider } from "@/component/common/nt-pulldown"
import { cn } from "@/config/tailwind"
import type { TResViewReservation } from "@/util/api/get-reservation-detail"
import {
	getHourFromStamp,
	getMinFromStamp,
	padStartToPrinting,
} from "@/util/common"

import PriceInput from "./price-input"
import TimeSelectionPulldown from "./time-selection-pulldown"

type ReservationPermissionFormPT = {
	reservation: TResViewReservation
	isAccepting: boolean
	selectedId: number
	setIsAccepting: Dispatch<SetStateAction<boolean>>
	endTime: MutableRefObject<number | undefined>
}

export default function ReservationPermissionForm({
	reservation,
	isAccepting,
	selectedId,
	setIsAccepting,
	endTime,
}: ReservationPermissionFormPT) {
	const { startTime, workHourInfo } = reservation

	useEffect(() => {
		setIsAccepting(false)
	}, [selectedId, setIsAccepting])

	const startHour = padStartToPrinting("time", getHourFromStamp(startTime))
	const startMin = padStartToPrinting("time", getMinFromStamp(startTime))

	return (
		<div
			className={cn(
				"flex flex-col transition-all",
				isAccepting
					? "min-h-[200px] opacity-100"
					: "h-0 opacity-0 transition-none",
			)}
		>
			<div className="flex h-[70px] w-full items-center gap-x-4 border-b border-Gray20 pl-12 max-md:pl-4">
				<p className="min-w-[5.5rem] text-Body02 font-SemiBold text-Gray80 max-md:min-w-[4rem]">
					가격
				</p>
				<PriceInput />
				<p className="text-Callout">원</p>
			</div>
			<div className="flex h-[70px] w-full items-center gap-x-4 border-b border-Gray20 pl-12 max-md:pl-4">
				<p className="min-w-[5.5rem] text-Body02 font-SemiBold text-Gray80 max-md:min-w-[4rem]">
					시간
				</p>
				<p className="text-Body02 font-SemiBold text-PB100">
					{`${startHour} : ${startMin}`} ~{" "}
				</p>
				<NTPulldownProvider>
					<TimeSelectionPulldown
						workHoursInfo={workHourInfo}
						endTime={endTime}
						startTime={startTime}
					/>
				</NTPulldownProvider>
			</div>
		</div>
	)
}
