import { memo, useEffect, type Dispatch, type SetStateAction } from "react"

import { dayOfWeekArr } from "@/component/custom/manager/(with-layout)/(home)/shop-information/shop-details/weekly-hours-display/daily-opening-hours/daily-opening-hours.util"
import { useShopById } from "@/hook/use-shop-controller"
import { getDayOfWeekFromStamp } from "@/util/common"
import { isUndefined } from "@/util/common/type-guard"

import AvailableTimes from "./available-times"
import ClosedDay from "./closed-day"

type TimeSelectionPT = {
	shopId: number
	selectedTime: number
	selectedStamp: number
	setSelectedTime: Dispatch<SetStateAction<number>>
}

function TimeSelection({
	shopId,
	selectedTime,
	selectedStamp,
	setSelectedTime,
}: TimeSelectionPT) {
	const { data, isLoading, isError } = useShopById(shopId)

	useEffect(() => {
		setSelectedTime(-1)
	}, [selectedStamp, setSelectedTime])

	if (isLoading) return <div className="h-[400px] w-full" />
	if (isError || isUndefined(data))
		return (
			<div className="flex h-[400px] w-full items-center justify-center text-Title01 text-Gray60">
				죄송합니다, 인터넷 문제로 오류가 발생했습니다.
			</div>
		)

	const { workHours } = data
	const dayOfWeekNum = dayOfWeekArr.findIndex(
		(day) => day === getDayOfWeekFromStamp(selectedStamp),
	)
	const targetDay = workHours.findIndex(
		(workhour) => workhour.dayOfWeek === dayOfWeekNum,
	)
	const selectedDate = workHours[targetDay]

	return (
		<div>
			{selectedDate.isOpen ? (
				<AvailableTimes
					selectedDate={selectedDate}
					selectedTime={selectedTime}
					selectedStamp={selectedStamp}
					setSelectedTime={setSelectedTime}
				/>
			) : (
				<ClosedDay />
			)}
		</div>
	)
}

const MemorizedTimeSelection = memo(TimeSelection)
export default MemorizedTimeSelection
