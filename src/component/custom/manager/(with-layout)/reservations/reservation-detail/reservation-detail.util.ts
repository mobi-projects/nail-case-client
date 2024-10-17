import { toast } from "sonner"

import {
	decomposeStamp,
	get12HourFromStamp,
	getDayDivisionInKor,
	getDayOfWeekFromStamp,
	getMinFromStamp,
} from "@/util/common"
import { isUndefined } from "@/util/common/type-guard"

export const formatTreatmentRequestTime = (
	startTime: number,
	endTime: number | null,
) => {
	let timeInfoText = ""
	const { date, min, month, year } = decomposeStamp(startTime)
	const dayOfWeek = getDayOfWeekFromStamp(startTime)
	const dayDivision = getDayDivisionInKor(startTime)
	const formattedStartHour = get12HourFromStamp(startTime)
	const formattedStartMin = min === 0 ? "" : "30분"
	if (endTime) {
		const endMin = getMinFromStamp(endTime)
		const formattedEndHour = get12HourFromStamp(endTime)
		const formattedEndMin = endMin === 0 ? "" : "30분"
		timeInfoText = `${year}년 ${month}월 ${date}일 (${dayOfWeek}요일) ${dayDivision} ${formattedStartHour}시 ${formattedStartMin} ~ ${formattedEndHour}시 ${formattedEndMin} `
	} else {
		timeInfoText = `${year}년 ${month}월 ${date}일 (${dayOfWeek}요일) ${dayDivision} ${formattedStartHour}시 ${formattedStartMin}`
	}
	return timeInfoText
}

export const validatePriceNEndTime = (price: string, time: number) => {
	const priceRegex = /^(?!0)([1-9]\d{0,5}|[1-9]\d{0,5}(,\d{3})*)$/ // 1 이상 999,999까지 허용

	// 빈 문자열 체크
	if (price === "") {
		toast.warning("가격을 입력해 주세요.")
		return false // 유효성 검사 실패
	}

	// 종료 시간 체크
	if (isUndefined(time)) {
		toast.warning("종료 시간을 확인해 주세요.")
		return false // 유효성 검사 실패
	}

	// 정규 표현식 검증
	if (!priceRegex.test(price)) {
		toast.warning(
			"가격은 0으로 시작할 수 없으며, 최대 999,999까지 입력 가능합니다.",
		)
		return false // 유효성 검사 실패
	}

	// 모든 조건을 통과한 경우 (유효성 검증 통과)
	return true // 유효성 검사 통과
}
