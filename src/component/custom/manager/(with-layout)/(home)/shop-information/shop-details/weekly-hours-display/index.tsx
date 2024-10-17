import type { TWorkHours } from "@/util/api/get-shop-info"

import DailyOpeningHours from "./daily-opening-hours"

type WeeklyHoursDisplayPT = {
	workHours: Array<TWorkHours>
}

export default function WeeklyHoursDisplay({
	workHours,
}: WeeklyHoursDisplayPT) {
	return (
		<div className="flex flex-col py-2">
			<div className="pb-2 text-Headline02 text-Gray80">영업시간</div>
			<div className="flex h-full w-full flex-col gap-y-4">
				{workHours.map((time) => (
					<DailyOpeningHours dailyWorkHours={time} key={time.dayOfWeek} />
				))}
			</div>
		</div>
	)
}
