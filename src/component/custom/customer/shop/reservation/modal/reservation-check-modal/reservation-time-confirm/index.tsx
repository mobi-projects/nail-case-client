import NTOption from "@/component/common/nt-option"
import { decomposeStamp, padStartToPrinting } from "@/util/common"

type ReseravtionTimeConfirmPT = {
	startTime: number
}
export default function ReseravtionTimeConfirm({
	startTime,
}: ReseravtionTimeConfirmPT) {
	const formattedTime = getFormattedTime(startTime)
	return (
		<div className="grid h-full w-full grid-cols-[1fr_3.5fr] items-center">
			<p className="text-Body02 font-SemiBold text-Gray80">시술 일시</p>
			<NTOption
				optionArr={[formattedTime]}
				optionClassName="font-Bold text-PB100"
			/>
		</div>
	)
}

const getFormattedTime = (timeStamp: number) => {
	const { date, hour, min, month, year } = decomposeStamp(timeStamp)
	const formattedHour = padStartToPrinting("time", hour)
	const formattedMin = padStartToPrinting("time", min)
	return `${year}년 ${month}월 ${date}일 ${formattedHour}시 ${formattedMin}분`
}
