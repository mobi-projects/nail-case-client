import dayjs from "dayjs"

import { NTButton } from "@/component/common/atom/nt-button"
import NTIcon from "@/component/common/nt-icon"

export default function ScheduleLayout() {
	return (
		<div className="grid w-full grid-rows-[70px_76px_62px] items-center border-t-[1px] border-t-Gray10">
			<p className="text-Title03 font-SemiBold">일정</p>
			<ScheduleController />
			<Manager_Base_Schedule_Layout_01_02 />
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
function Manager_Base_Schedule_Layout_01_02() {
	return <div className="h-full w-full border-[5px] border-green-300" />
}
