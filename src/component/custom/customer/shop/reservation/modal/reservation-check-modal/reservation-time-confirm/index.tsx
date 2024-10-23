import NTOption from "@/component/common/nt-option"
import {
	decomposeStamp,
	get12HourFromStamp,
	getDayDivisionInKor,
	getDayOfWeekFromStamp,
	padStartToPrinting,
} from "@/util/common"

type ReseravtionTimeConfirmPT = {
	startTime: number
}
export default function ReseravtionTimeConfirm({
	startTime,
}: ReseravtionTimeConfirmPT) {
	const formattedTime = getFormattedTime(startTime)
	return (
		<div className="grid h-full w-full grid-cols-[1fr_3.5fr] items-center">
			<p className="min-w-[4rem] text-Body02 font-SemiBold text-Gray80 max-md:text-[12px]">
				시술 일시
			</p>
			<NTOption
				optionArr={[formattedTime]}
				optionClassName="font-Bold text-PB100 max-md:text-[12px]  max-md:font-SemiBold"
			/>
		</div>
	)
}

const getFormattedTime = (timeStamp: number) => {
	const { date, hour, min, month, year } = decomposeStamp(timeStamp)
	const dayOfWeek = getDayOfWeekFromStamp(timeStamp)
	const division = getDayDivisionInKor(timeStamp)
	const convertedHour = get12HourFromStamp(hour)
	const formattedHour = padStartToPrinting("time", convertedHour)
	const formattedMin = padStartToPrinting("time", min)
	return `${year}년 ${month}월 ${date}일 (${dayOfWeek}) ${division} ${formattedHour}시 ${formattedMin}분`
}
