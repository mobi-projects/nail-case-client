import { decomposeStamp, padStartToPrinting } from "@/util/common"
import { isNull } from "@/util/common/type-guard"

type NicknameNTimePT = {
	nickname: string
	companion: number
	startTime: number
	endTime: number | null
}
export default function NicknameNTime({
	nickname,
	companion,
	startTime,
	endTime,
}: NicknameNTimePT) {
	nickname = addEllipsesToText(nickname, 3)
	const pureCompanion = companion - 1

	const formattedNickname = getFormattedNickname(nickname, pureCompanion)
	const formattedStartTime = getFormattedTime(startTime)

	const isEndTime = !isNull(endTime)
	const formattedEndTime = isEndTime ? getFormattedTime(endTime!) : ""

	return (
		<div className="flex h-full w-full flex-col">
			<p className="text-Headline01 font-Bold text-Gray90">
				{formattedNickname}
			</p>
			<p className="mt-[5px] text-Headline02 font-SemiBold text-Gray60">
				{formattedStartTime}
			</p>
			{isEndTime && (
				<p className="text-Headline02 font-SemiBold text-Gray60">
					~ {formattedEndTime}
				</p>
			)}
		</div>
	)
}

const addEllipsesToText = (text: string, length: number) => {
	if (text.length > length) text = text.substring(0, length) + "..."
	return text
}
const getFormattedNickname = (nickname: string, companion: number) => {
	if (companion === 0) return [nickname, "님"].join(" ")
	return [nickname, "님 외", companion, "명"].join(" ")
}
const getFormattedTime = (timestamp: number) => {
	const { year, month, date, hour, min } = decomposeStamp(timestamp)
	const [
		formattedYear,
		formattedMonth,
		formattedDate,
		formattedHour,
		formattedMin,
	] = [
		year.toString().substring(2, 4),
		padStartToPrinting("month", month),
		padStartToPrinting("date", date),
		padStartToPrinting("time", hour),
		padStartToPrinting("time", min),
	]
	const yymmdd = [formattedYear, formattedMonth, formattedDate].join(".")
	const hhmm = [formattedHour, formattedMin].join(":")
	return [yymmdd, hhmm].join(" ")
}
