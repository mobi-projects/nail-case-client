import { useShopById } from "@/hook/use-shop-controller"
import type { TReqReservationForm } from "@/util/api/post-register-reservation"
import {
	get12HourFromStamp,
	getDateFromStamp,
	getDayDivisionInKor,
	getDayOfWeekFromStamp,
	getMinFromStamp,
	getMonthFromStamp,
	padStartToPrinting,
} from "@/util/common"

type ContentHeaderPT = {
	newReservation: TReqReservationForm
}

export default function ContentHeader({ newReservation }: ContentHeaderPT) {
	const startTime = newReservation.startTime
	const { data } = useShopById(newReservation.shopId)
	const printedReservationTime = [
		`${getMonthFromStamp(startTime)}월`,
		`${getDateFromStamp(startTime)}일`,
		`(${getDayOfWeekFromStamp(startTime)}요일)`,
		`${getDayDivisionInKor(startTime)}`,
		`${get12HourFromStamp(startTime)}:${padStartToPrinting("time", getMinFromStamp(startTime))}`,
	].join(" ")

	return (
		<div className="flex h-[85px] flex-col justify-between max-md:justify-evenly">
			<p className="text-center text-Title01 font-SemiBold text-White max-md:text-[18px]">
				{data?.shopName}
			</p>
			<p className="text-center text-Body02 font-Regular text-PB100">
				{printedReservationTime}
			</p>
		</div>
	)
}
