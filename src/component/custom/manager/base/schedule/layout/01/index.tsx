"use client"
import dayjs from "dayjs"
import { usePathname, useRouter } from "next/navigation"

import NTDateTime from "@/component/common/nt-date-time"
import NTIcon from "@/component/common/nt-icon"
import NTPulldown from "@/component/common/nt-pulldown"
import { MANAGER_BASE_SCHEDULE_THIS_MONTH } from "@/constant/routing-path"
import { PATH_LIST_FOR_MANAGER_BASE_SCHEDULE_TOOLBAR } from "@/constant/toolbar-list"
import { usePulldown } from "@/hook/use-component"
import {
	getDayOfWeekFromStamp,
	getKSTStamp,
	getThisDate,
	getThisMonth,
	getThisYear,
	getWeekNumber,
} from "@/util/common"

import { TimeInfoProvider } from "./schedule-time.context"

export default function ScheduleLayout() {
	return (
		<TimeInfoProvider>
			<div className="grid w-full grid-rows-[70px_76px_62px] items-center border-t border-t-Gray10">
				<p className="text-Title03 font-SemiBold">일정</p>
				<ScheduleController />
				<ScheduleInfo />
			</div>
		</TimeInfoProvider>
	)
}

function ScheduleController() {
	const router = useRouter()
	const pathName = usePathname()
	const { setTimeInfo, timeInfo } = useTimeInfo()
	const { day, month, year } = timeInfo
	const categoryArr = ["월별", "주별", "일별"]

	const onClickDateTimeBtn = (idx: number) => {
		setTimeInfo({
			year: getThisYear(),
			month: getThisMonth(),
			day: getThisDate(),
		})
		router.push(PATH_LIST_FOR_MANAGER_BASE_SCHEDULE_TOOLBAR[idx])
	}
	// 페이지 경로에 따라서 layout에 보여질 날짜정보 text로반환
	const getDateDisplayText = () => {
		const weekNumber = getWeekNumber(year, month, day)
		const dayOfWeek = getDayOfWeekFromStamp(getKSTStamp(year, month, day))
		if (pathName === PATH_LIST_FOR_MANAGER_BASE_SCHEDULE_TOOLBAR[0])
			return `${year}년 ${month}월`
		if (pathName === PATH_LIST_FOR_MANAGER_BASE_SCHEDULE_TOOLBAR[1])
			return `${month}월 ${weekNumber}주차`
		if (pathName === PATH_LIST_FOR_MANAGER_BASE_SCHEDULE_TOOLBAR[2])
			return `${month}월 ${day}일 (${dayOfWeek}요일)`
	}

	// onClickPrevBtn 함수 정의
	const onClickPrevBtn = () => {
		setTimeInfo((currentTimeInfo) => {
			let newDate
			switch (pathName) {
				case PATH_LIST_FOR_MANAGER_BASE_SCHEDULE_TOOLBAR[0]: {
					// 현재 달이 12월이라면, 이전 달로 넘어가고 일수를 맞추기
					const currentDate = dayjs()
						.year(currentTimeInfo.year)
						.month(currentTimeInfo.month - 1) // 현재 달에서 1개월 빼기
						.date(currentTimeInfo.day) // 현재 일자를 유지

					newDate = currentDate.subtract(currentDate.date(), "day") // 현재 달의 일수만큼 일 빼기

					// `newDate`는 1월 1일로 이동될 수 있으므로 month와 year를 조정합니다.
					break
				}
				case PATH_LIST_FOR_MANAGER_BASE_SCHEDULE_TOOLBAR[1]: {
					// 일주일 단위로 이동 (7일 감소)
					const currentDate = dayjs()
						.year(currentTimeInfo.year)
						.month(currentTimeInfo.month - 1) // 현재 달에서 1개월 빼기
						.date(currentTimeInfo.day) // 현재 일자를 유지

					newDate = currentDate.subtract(1, "week") // 일주일 감소

					break
				}
				case PATH_LIST_FOR_MANAGER_BASE_SCHEDULE_TOOLBAR[2]: {
					// 하루 단위로 이동 (1일 감소)
					const currentDate = dayjs()
						.year(currentTimeInfo.year)
						.month(currentTimeInfo.month - 1) // 현재 달에서 1개월 빼기
						.date(currentTimeInfo.day) // 현재 일자를 유지

					newDate = currentDate.subtract(1, "day") // 하루 감소

					break
				}
				default: {
					throw new Error(`Unhandled pathName: ${pathName}`)
				}
			}

			return {
				year: newDate.year(),
				month: newDate.month() + 1, // month()는 0 기반이므로 +1
				day: newDate.date(), // 계산된 일자
			}
		})
	}

	const onClickNextBtn = () => {
		setTimeInfo((currentTimeInfo) => {
			let newDate
			switch (pathName) {
				case PATH_LIST_FOR_MANAGER_BASE_SCHEDULE_TOOLBAR[0]: {
					// 현재 달의 첫 날로 이동하고 다음 달로 이동
					const currentDate = dayjs()
						.year(currentTimeInfo.year)
						.month(currentTimeInfo.month - 1) // 현재 달에서 1개월 빼기
						.date(currentTimeInfo.day) // 현재 일자를 유지

					newDate = currentDate.add(
						currentDate.daysInMonth() - currentDate.date() + 1,
						"day",
					) // 현재 달의 남은 일수만큼 더하기

					// `newDate`는 다음 달 1일로 이동될 수 있으므로 month와 year를 조정합니다.
					break
				}
				case PATH_LIST_FOR_MANAGER_BASE_SCHEDULE_TOOLBAR[1]: {
					// 일주일 단위로 이동 (7일 증가)
					const currentDate = dayjs()
						.year(currentTimeInfo.year)
						.month(currentTimeInfo.month - 1) // 현재 달에서 1개월 빼기
						.date(currentTimeInfo.day) // 현재 일자를 유지

					newDate = currentDate.add(1, "week") // 일주일 증가

					break
				}
				case PATH_LIST_FOR_MANAGER_BASE_SCHEDULE_TOOLBAR[2]: {
					// 하루 단위로 이동 (1일 증가)
					const currentDate = dayjs()
						.year(currentTimeInfo.year)
						.month(currentTimeInfo.month - 1) // 현재 달에서 1개월 빼기
						.date(currentTimeInfo.day) // 현재 일자를 유지

					newDate = currentDate.add(1, "day") // 하루 증가

					break
				}
				default: {
					throw new Error(`Unhandled pathName: ${pathName}`)
				}
			}

			return {
				year: newDate.year(),
				month: newDate.month() + 1, // month()는 0 기반이므로 +1
				day: newDate.date(), // 계산된 일자
			}
		})
	}

	return (
		<div className="flex h-full w-full items-center justify-between border-t-[1.5px] border-t-Gray10 bg-BGblue01">
			<div className="gap-x- flex items-center">
				<NTIcon
					onClick={onClickPrevBtn}
					icon="expandLeft"
					className="h-7 w-7 cursor-pointer text-Gray08"
				/>
				<p className="text-Headline02 text-Gray100">{getDateDisplayText()}</p>
				<NTIcon
					onClick={onClickNextBtn}
					icon="expandRight"
					className="h-7 w-7 cursor-pointer text-Gray08"
				/>
			</div>
			<div className="flex gap-x-4">
				{categoryArr.map((category, idx) => (
					<NTDateTime
						key={idx}
						isClicked={
							pathName === PATH_LIST_FOR_MANAGER_BASE_SCHEDULE_TOOLBAR[idx]
						}
						clickCallback={() => onClickDateTimeBtn(idx)}
					>
						{category}
					</NTDateTime>
				))}
			</div>
		</div>
	)
}

function ScheduleInfo() {
	const pulldownSchedule = usePulldown()
	const pathName = usePathname()
	return (
		<div className="flex h-full w-full items-center justify-between border-y-[1px] border-y-PB50/40">
			<div className="flex h-full items-center pl-7">
				<div className="flex h-fit items-end gap-x-2">
					<p className="text-Headline02 font-SemiBold text-Gray100">총 시술</p>
					<p className="text-Headline01 text-PB100">136 건</p>
				</div>
				<NTIcon
					icon="dot"
					className="flex h-fit w-7 cursor-pointer items-end text-Gray40"
				/>
				<div className="flex h-fit items-end gap-x-2">
					<p className="text-Headline02 text-Gray100">예약 대기</p>
					<p className="text-Headline01 text-PB100">3 건</p>
				</div>
				<NTIcon
					icon="dot"
					className="flex h-fit w-7 cursor-pointer items-end text-Gray40"
				/>
				<div className="flex h-fit items-end gap-x-2">
					<p className="text-Headline02 text-Gray100">예약 확정</p>
					<p className="text-Headline01 text-PB100">22 건</p>
				</div>
			</div>
			{pathName === MANAGER_BASE_SCHEDULE_THIS_MONTH ? (
				<NTPulldown
					description="시술 건수를 선택해주세요"
					optionArr={["3건이하", "4건 이상 6건 이하", "7건 이상"]}
					placeholder="시술"
					position="right"
					{...pulldownSchedule}
				/>
			) : null}
		</div>
	)
}
