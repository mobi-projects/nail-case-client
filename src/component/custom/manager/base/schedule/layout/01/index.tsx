"use client"
import dayjs from "dayjs"
import { usePathname, useRouter } from "next/navigation"
import { useState } from "react"

import NTDateTime from "@/component/common/nt-date-time"
import NTIcon from "@/component/common/nt-icon"
import NTPulldown from "@/component/common/nt-pulldown"
import { MANAGER_BASE_SCHEDULE_THIS_MONTH } from "@/constant/routing-path"
import { PATH_LIST_FOR_MANAGER_BASE_SCHEDULE_TOOLBAR } from "@/constant/toolbar-list"
import { usePulldown } from "@/hook/use-component"
import type { TResGetListReservation, TReservationDetailList } from "@/type"
import type { TResponseData } from "@/type/response"
import { isUndefined } from "@/util/common/type-guard"

export default function ScheduleLayout() {
	return (
		<div className="grid w-full grid-rows-[70px_76px_62px] items-center border-t border-t-Gray10">
			<p className="text-Title03 font-SemiBold">일정</p>
			<ScheduleController />
			<ScheduleInfo />
		</div>
	)
}

function ScheduleController() {
	const year = dayjs().year()
	const month = dayjs().month() + 1
	const categoryArr = ["월별", "주별", "일별"]

	const [clickIdx, setClickIdx] = useState(0)
	const router = useRouter()

	const onClickBtn = (idx: number) => {
		setClickIdx(idx)
		router.push(PATH_LIST_FOR_MANAGER_BASE_SCHEDULE_TOOLBAR[idx])
	}

	return (
		<div className="flex h-full w-full items-center justify-between border-t-[1.5px] border-t-Gray10 bg-BGblue01">
			<div className="gap-x- flex items-center">
				<NTIcon icon="expandLeft" className="h-7 w-7 text-Gray08" />
				<p className="text-Headline02 text-Gray100">{`${year}년 ${month}월`}</p>
				<NTIcon icon="expandRight" className="h-7 w-7 text-Gray08" />
			</div>
			<div className="flex gap-x-4">
				{categoryArr.map((category, idx) => (
					<NTDateTime
						key={idx}
						isClicked={clickIdx === idx}
						clickCallback={() => onClickBtn(idx)}
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

/**
 * @param data listReservation 예약정보
 * @param status 예약상태 5가지중 선택"CONFIRMED" | "REJECTED" | "CANCELED" | "PENDING" | "COMPLETED"
 * @returns 전체 예약정보중 status와 일치하는 예약정보 반환
 */
export const sortReservation = (
	data: TResponseData<TResGetListReservation[], "dataList"> | undefined,
	status: "CONFIRMED" | "REJECTED" | "CANCELED" | "PENDING" | "COMPLETED",
) => {
	if (isUndefined(data)) return []
	return data.dataList.reduce<TReservationDetailList[]>(
		(data, reservation) => {
			data.push(
				...reservation.reservationDetailList.filter(
					(detail) => detail.status === status,
				),
			)
			return data
		},

		[],
	)
}
