"use client"

import { NTButton } from "@/component/common/atom/nt-button"
import NTOption from "@/component/common/nt-option"
import { useOption } from "@/hook/use-component"

export default function ReservationSchedule() {
	return (
		<div className="grid h-fit w-full grid-cols-[690px_485px] justify-between">
			<Calendar />
			<ReservationCheck />
		</div>
	)
}
function Calendar() {
	return (
		<div className="grid h-full w-full grid-rows-[326.8px_auto] gap-[21px]">
			<CalendarBody />
			<NTButton variant="tertiary" flexible="full" size="small">
				예약하기
			</NTButton>
		</div>
	)
}
function ReservationCheck() {
	return (
		<div className="grid h-full w-full grid-rows-[326.8px_auto] gap-[18px]">
			<ReservationCheckBody />
			<NTButton variant="tertiary" flexible="full" size="small">
				전화하기
			</NTButton>
		</div>
	)
}
function CalendarBody() {
	return (
		<div className="flex h-full w-full items-center justify-center rounded-[26px] border-[5px] border-green-300 drop-shadow">
			🛠️ 달력 준비 중..
		</div>
	)
}
function ReservationCheckBody() {
	const { checkedOption, onClickOption, optionArr } = useOption([
		"오전 11시",
		"오후 1시",
		"오후 2시",
		"오후 3시",
		"오전 11시",
		"오후 1시",
		"오후 3시",
	])
	const {
		checkedOption: checkedOption3,
		onClickOption: onClickOption3,
		optionArr: optionArr3,
	} = useOption(["1인", "2인 동반"])

	return (
		<div className="gap-[16px]] flex h-full w-full flex-col justify-around py-[10px]">
			<p className="w-full justify-center text-center text-[1rem] font-SemiBold text-Gray90">
				6월 27일 (목요일)
			</p>
			<hr />
			<NTOption
				{...{ checkedOption, optionArr, onClickOption }}
				itemsPerRow={4}
			/>
			<hr />
			<NTOption
				checkedOption={checkedOption3}
				optionArr={optionArr3}
				onClickOption={onClickOption3}
			/>
			<p className="text-[16px] font-Regular text-Gray50">
				2인 동반 선택시에는 두 타임 예약 부탁드립니다 :)
			</p>
		</div>
	)
}
