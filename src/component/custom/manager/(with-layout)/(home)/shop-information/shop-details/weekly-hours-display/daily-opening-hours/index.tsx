import { cn } from "@/config/tailwind"
import type { TWorkHours } from "@/util/api/get-shop-info"

import { getDayOfWeek, getOpeningHoursString } from "./daily-opening-hours.util"

type DailyOpeningHoursPT = {
	dailyWorkHours: TWorkHours
}

export default function DailyOpeningHours({
	dailyWorkHours,
}: DailyOpeningHoursPT) {
	const { dayOfWeek, isOpen } = dailyWorkHours
	return (
		<div className="grid grid-cols-[1fr_1fr_10fr] items-center pl-3">
			<div
				className={cn(
					"h-2 w-2 rounded-full ring-2",
					isOpen ? "bg-PB100 ring-PB50" : "bg-Gray40 ring-Gray20",
				)}
			/>
			<p
				className={cn(
					"text-Body01 font-SemiBold",
					isOpen ? "text-Black" : "text-Gray40",
				)}
			>
				{getDayOfWeek(dayOfWeek)}
			</p>
			<div
				className={cn(
					"text-Body01 tabular-nums",
					isOpen ? "text-Black" : "text-Gray40",
				)}
			>
				{getOpeningHoursString(dailyWorkHours)}
			</div>
		</div>
	)
}
