import { decomposeStamp, padStartToPrinting } from "@/util/common"

type StartToEndPT = {
	companion: number
	startTime: number
	endTime: number
}
export default function ConfirmApproval({
	companion,
	startTime,
	endTime,
}: StartToEndPT) {
	const { yearToDate, hourToMin: startHourToMin } = getFormattedTime(startTime)
	const { hourToMin: endHourToMin } = getFormattedTime(endTime)
	return (
		<div className="flex h-[150px] flex-col justify-start gap-[8px]">
			<p className="text-Body01 font-SemiBold text-Gray90">예약 내용 요약</p>
			<li className="break-keep text-Callout text-Gray50">
				총 시술인원: <strong>{companion}</strong>
			</li>
			<li className="break-keep text-Callout text-Gray50">
				예약일: <strong>{yearToDate}</strong>
			</li>
			<li className="break-keep text-Callout text-Gray50">
				소요시간:{" "}
				<strong>
					{startHourToMin} ~ {endHourToMin}
				</strong>
			</li>
		</div>
	)
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
		padStartToPrinting("year", year),
		padStartToPrinting("month", month),
		padStartToPrinting("date", date),
		padStartToPrinting("time", hour),
		padStartToPrinting("time", min),
	]
	const yearToDate = [formattedYear, formattedMonth, formattedDate].join(".")
	const hourToMin = [formattedHour, formattedMin].join(":")
	return { yearToDate, hourToMin }
}
