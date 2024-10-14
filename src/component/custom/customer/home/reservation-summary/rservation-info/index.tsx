import { NTButton } from "@/component/common/atom/nt-button"
import NTIcon from "@/component/common/nt-icon"
import type { TReservationInfo } from "@/util/api-v2/get-main-page-data"

import {
	createReservationOptionArr,
	transformEndTimeToString,
	transfromStartTimeToString,
} from "../reservation-summary.util"

import Tag from "./tag"

type ReservationInfoPT = {
	reservation: TReservationInfo
}

export default function ReservationInfo({ reservation }: ReservationInfoPT) {
	const { shop, details } = reservation
	const reservationOptionArr = createReservationOptionArr(details)
	const startTimeText = transfromStartTimeToString(details[0].startTime)
	const endTImeText = transformEndTimeToString(details[0].endTime)

	return (
		<div className="grid grid-rows-4">
			<div className="text-Title01 font-Bold">{shop.name}</div>
			<div className="flex items-center gap-x-2">
				<NTIcon icon="clock" className="text-Gray50" />
				<div className="text-xl font-SemiBold text-Gray60">
					{startTimeText} ~ {endTImeText && endTImeText}
				</div>
			</div>
			<div className="flex items-center gap-x-2">
				{reservationOptionArr.map((option, idx) => (
					<Tag option={option} key={idx} />
				))}
			</div>
			<div className="flex w-full items-center justify-end">
				<NTButton size={"small"} variant={"alert"}>
					예약취소
				</NTButton>
			</div>
		</div>
	)
}
