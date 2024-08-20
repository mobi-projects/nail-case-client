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
	isValid: boolean
	isOpen: boolean
	onIncreaseTimestamp: VoidFunction
	onDecreaseTimestamp: VoidFunction
}
export default function TimeSetter({
	timestamp,
	isValid,
	isOpen,
	onIncreaseTimestamp,
	onDecreaseTimestamp,
}: TimeSetterPT) {
	const hour = get12HourFromStamp(timestamp)
	const formattedHour = padStartToPrinting("time", hour)
	const minute = getMinFromStamp(timestamp)
	const formattedMinute = padStartToPrinting("time", minute)
	const dayDivision = getDayDivisionInKor(timestamp)
	const printedTime = `${dayDivision} ${formattedHour}:${formattedMinute}`

	return (
		<div
			aria-disabled={!isOpen}
			className={cn(
				"flex h-full w-full cursor-default items-center justify-around rounded-[8px] border border-PB100 text-Body01 text-PB100 hover:shadow-customCardPB",
				!isValid && "border-[#FF2C45] text-[#FF2C45] hover:shadow-none",
				!isOpen && "pointer-events-none border-Gray40 text-Gray40 shadow-none",
			)}
		>
			<NTIcon
				icon="expandDownLight"
				className="h-full cursor-pointer transition-all hover:translate-y-1 hover:scale-125"
				onClick={onDecreaseTimestamp}
			/>
			<p className="select-none">{printedTime}</p>
			<NTIcon
				icon="expandUpLight"
				className="h-full cursor-pointer transition-all hover:-translate-y-1 hover:scale-125"
				onClick={onIncreaseTimestamp}
			/>
		</div>
	)
}
