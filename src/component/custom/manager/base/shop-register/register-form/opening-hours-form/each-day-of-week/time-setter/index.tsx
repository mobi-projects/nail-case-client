import NTIcon from "@/component/common/nt-icon"
import { cn } from "@/config/tailwind"
import {
	get12HourFromStamp,
	getDayDivisionInKor,
	getMinFromStamp,
	padStartToPrinting,
} from "@/util/common"

type TimeSetterPT = {
	timestamp: number
	isInvalid: boolean
}
export default function TimeSetter({ timestamp, isInvalid }: TimeSetterPT) {
	const hour = get12HourFromStamp(timestamp)
	const formattedHour = padStartToPrinting("time", hour)
	const minute = getMinFromStamp(timestamp)
	const formattedMinute = padStartToPrinting("time", minute)
	const dayDivision = getDayDivisionInKor(timestamp)
	const printedTime = `${dayDivision} ${formattedHour}:${formattedMinute}`

	return (
		<div
			className={cn(
				"flex h-full w-full items-center justify-around rounded-[8px] border border-PB100 text-Body01 text-PB100 hover:shadow-customCardPB disabled:border-Gray60 disabled:text-Gray60",
				isInvalid && "border-[#FF2C45] text-[#FF2C45] hover:shadow",
			)}
		>
			<NTIcon
				icon="expandDownLight"
				className="h-full transition-all hover:translate-y-1 hover:scale-125"
			/>
			<p>{printedTime}</p>
			<NTIcon
				icon="expandUpLight"
				className="h-full transition-all hover:-translate-y-1 hover:scale-125"
			/>
		</div>
	)
}
