import NTContent from "@/component/common/nt-content"
import type { TReservationInfo } from "@/util/api-v2/get-main-page-data"

import InfoButtons from "./info-buttons"
import {
	createReservationOptions,
	getReservationStatus,
	transformEndTimeToString,
	transfromStartTimeToString,
} from "./time-n-options.util"

type TImeNOptionsPT = { recentReservation: TReservationInfo }

export default function TimeNOptions({ recentReservation }: TImeNOptionsPT) {
	const { details } = recentReservation

	const reservationStatus = getReservationStatus(details)
	const reservationOptions = createReservationOptions(details)
	const startTimeText = transfromStartTimeToString(details[0].startTime)
	const endTImeText = transformEndTimeToString(details[0].endTime)

	return (
		<div className="flex h-full w-full flex-col gap-y-4 pt-14">
			<NTContent mode="day" className="px-[15.5px]">
				{reservationStatus}
			</NTContent>
			<div className="flex items-center gap-x-5">
				<div className="text-Body02 font-SemiBold">시술 시간</div>
				<div className="text-Body02 font-SemiBold text-PB100">
					{startTimeText}
					{endTImeText && endTImeText}
				</div>
			</div>
			<div className="flex items-center gap-x-5">
				<div className="text-Body02 font-SemiBold">시술 요약</div>
				<div className="line-clamp-1 text-Body02 text-Gray100">
					{reservationOptions}
				</div>
			</div>
			<InfoButtons recentReservation={recentReservation} />
		</div>
	)
}
