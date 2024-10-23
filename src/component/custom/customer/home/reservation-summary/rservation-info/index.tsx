import { NTButton } from "@/component/common/atom/nt-button"
import NTIcon from "@/component/common/nt-icon"
import type { TReservationInfo } from "@/util/api/get-main-page-data"

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
		<div className="grid grid-rows-4 max-md:flex max-md:flex-col max-md:gap-y-2">
			<div className="text-Title01 font-Bold max-md:text-[16px]">
				{shop.name}
			</div>
			<div className="flex items-center gap-x-2">
				<NTIcon
					icon="clock"
					className="text-Gray50 md:h-5 md:w-5 max-sm:hidden"
				/>
				<div className="text-xl font-SemiBold text-Gray60 md:text-[16px] max-sm:text-[12px]">
					{startTimeText} ~ {endTImeText && endTImeText}
				</div>
			</div>
			<div className="flex items-center gap-2 max-md:flex-wrap">
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
