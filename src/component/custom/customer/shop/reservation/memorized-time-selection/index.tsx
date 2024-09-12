import dayjs from "dayjs"
import { memo, useMemo, type Dispatch, type SetStateAction } from "react"

import NTOption from "@/component/common/nt-option"
import { dayOfWeekArr } from "@/component/custom/manager/(with-layout)/(home)/shop-information/shop-details/weekly-hours-display/daily-opening-hours/daily-opening-hours.util"
import { useShopById } from "@/hook/use-shop-controller"
import type { TWorkHour } from "@/util/api-v2/get-shop-by-id"
import { getDayOfWeekFromStamp } from "@/util/common"
import { isUndefined } from "@/util/common/type-guard"

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
	if (isLoading) return "로드중"
	if (isError || isUndefined(data)) return "데이터에러"
	const { workHours } = data

	return (
		<div className="grid w-full grid-rows-[1fr_2fr_1fr_2fr] pl-3">
			<div className="w-full text-Title03 font-SemiBold text-Gray70">오전</div>
			{/* <NTOption optionArr={timeOptions} optionClassName="min-w-[6rem]" /> */}
			<div className="w-full text-Title03 font-SemiBold text-Gray70">오후</div>
			<NTOption
				optionArr={["1:00", "2:00", "3:00", "4:00", "5:00"]}
				optionClassName="min-w-[6rem]"
			/>
		</div>
	)
}

// 30분 간격으로 배열을 생성하는 함수
const getTimeRangeArr = (
	workHours: Array<TWorkHour>,
	selectedStamp: number,
) => {
	const dayOfWeekNum = dayOfWeekArr.findIndex(
		(day) => day === getDayOfWeekFromStamp(selectedStamp),
	)
	const targetDay = workHours.findIndex(
		(workhour) => workhour.dayOfWeek === dayOfWeekNum,
	)
	if (!workHours[targetDay].isOpen) return ["휴무일 입니다."]

	const { openTime, closeTime } = workHours[targetDay]

	const timeOptions: Array<number> = []

	let currentStamp = openTime
	while (currentStamp < closeTime) {
		timeOptions.push(currentStamp)
		currentStamp = dayjs.unix(currentStamp).add(30, "minute").unix()
	}

	return timeOptions
}

const MemorizedTimeSelection = memo(TimeSelection)
export default MemorizedTimeSelection
