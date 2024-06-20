"use client"
import dayjs from "dayjs"

import { NTButton } from "@/component/common/atom/nt-button"
import NTIcon from "@/component/common/nt-icon"
import NTPulldown from "@/component/common/nt-pulldown"
import { usePulldown } from "@/hook/use-component"

export default function ScheduleLayout() {
	return (
		<div className="grid w-full grid-rows-[70px_76px_62px] items-center border-t-[1px] border-t-Gray10">
			<p className="text-Title03 font-SemiBold">일정</p>
			<ScheduleController />
			<ScheduleInfo />
		</div>
	)
}

function ScheduleController() {
	const year = dayjs().year()
	const month = dayjs().month() + 1

	return (
		<div className="1 flex h-full w-full items-center justify-between border-t-[1.5px] border-t-Gray10 bg-BGblue01">
			<div className="gap-x- flex items-center">
				<NTIcon icon="expandLeft" className="h-7 w-7 text-Gray08" />
				<p className="text-Headline02 text-Gray100">{`${year}년 ${month}월`}</p>
				<NTIcon icon="expandRight" className="h-7 w-7 text-Gray08" />
			</div>
			<div className="flex gap-x-2">
				<NTButton variant={"primary"} size={"exSmall"}>
					이번달
				</NTButton>
				<NTButton variant={"primary"} size={"exSmall"} disabled>
					이번주
				</NTButton>
				<NTButton variant={"primary"} size={"exSmall"} disabled>
					오늘
				</NTButton>
			</div>
		</div>
	)
}
function ScheduleInfo() {
	const { isOpen, onClickItems, onClickTrigger, onClickWrapper, optionArr } =
		usePulldown(["시술"])
	return (
		<div className="flex h-full w-full items-center justify-between border-y-[1px] border-y-PB50/40">
			<div className="flex h-full items-center pl-7">
				<div className="flex h-fit items-end gap-x-2">
					<p className="text-Headline02 font-SemiBold text-Gray100">총 시술</p>
					<p className="text-Headline01 text-PB100">136 건</p>
				</div>
				<NTIcon icon="dot" className="flex h-fit w-7 items-end text-Gray40" />
				<div className="flex h-fit items-end gap-x-2">
					<p className="text-Headline02 text-Gray100">예약 대기</p>
					<p className="text-Headline01 text-PB100">3 건</p>
				</div>
				<NTIcon icon="dot" className="flex h-fit w-7 items-end text-Gray40" />
				<div className="flex h-fit items-end gap-x-2">
					<p className="text-Headline02 text-Gray100">예약 확정</p>
					<p className="text-Headline01 text-PB100">22 건</p>
				</div>
			</div>
			<NTPulldown
				{...{
					isOpen,
					onClickItems,
					onClickTrigger,
					onClickWrapper,
					optionArr,
				}}
			/>
		</div>
	)
}
