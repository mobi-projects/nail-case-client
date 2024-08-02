import { isNull } from "@/util/common/type-guard"

import { getFormattedTime, getPrintedNickname } from "./name-n-time.util"

type NameNTimePT = {
	nickname: string
	startTime: number
	endTime: number | null
}
export function NameNTime({ nickname, startTime, endTime }: NameNTimePT) {
	const printedNickname = getPrintedNickname(nickname)
	const printedStartTime = getFormattedTime(startTime)

	const isEndTime = !isNull(endTime)
	const printedEndTime = isEndTime ? "" : "~ " + getFormattedTime(endTime!)

	return (
		<div className="flex h-full w-full flex-col">
			<p className="text-Headline01 font-Bold text-Gray90">{printedNickname}</p>
			<p className="mt-[5px] text-Headline02 font-SemiBold text-Gray60">
				{printedStartTime}
			</p>
			<p className="text-Headline02 font-SemiBold text-Gray60">
				{printedEndTime}
			</p>
		</div>
	)
}
