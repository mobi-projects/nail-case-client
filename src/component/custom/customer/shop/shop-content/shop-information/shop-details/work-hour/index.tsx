import { useModal } from "@/component/common/nt-modal/nt-modal.context"
import type { TWorkHour } from "@/util/api-v2/get-shop-by-id"

import InfoCard from "../info-card"

import WorkHourModal from "./work-hour-modal"
import {
	getWorkHoursSummary,
	getWorkHourSummaryString,
} from "./work-hour-modal/daily-opening-hours/daily-opening-hours.util"

type WorkHoursCardPT = {
	workHours: Array<TWorkHour>
}
export default function WorkHoursCard({ workHours }: WorkHoursCardPT) {
	const { onOpenModal } = useModal()
	const handleArtClick = () => {
		onOpenModal({
			children: <WorkHourModal workHours={workHours} />,
			size: "exSmall",
			isX: false,
		})
	}

	const { todayWorkHour, tomorrowWorkHour } = getWorkHoursSummary(workHours)
	const workHourSummary: Array<string> = []
	if (todayWorkHour && tomorrowWorkHour) {
		workHourSummary.push(
			...[
				getWorkHourSummaryString(todayWorkHour),
				getWorkHourSummaryString(tomorrowWorkHour),
			],
		)
	}
	return (
		<InfoCard
			title="영업시간"
			content={workHourSummary}
			showDot={true}
			isClickable={true}
			onClick={handleArtClick}
		/>
	)
}
