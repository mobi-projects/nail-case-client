import {
	ModalBody,
	ModalContent,
	ModalHeader,
} from "@/component/common/nt-modal"
import type { TWorkHour } from "@/util/api/get-shop-by-id"

import {
	getDayOfWeek,
	getOpeningHoursString,
} from "./daily-opening-hours/daily-opening-hours.util"

type WorkHourModaPT = { workHours: Array<TWorkHour> }

export default function WorkHourModal({ workHours }: WorkHourModaPT) {
	return (
		<ModalContent className="flex h-full w-full items-center justify-center">
			<ModalHeader className="grid w-full grid-cols-[1fr_2fr] rounded-t-xl border-x border-t border-Gray30 bg-Gray20">
				<div className="flex items-center justify-center border-r border-Gray30 py-3 text-Headline02 font-SemiBold">
					요일
				</div>
				<div className="flex items-center justify-center text-Headline02">
					영업시간
				</div>
			</ModalHeader>
			<ModalBody className="w-full">
				<div className="grid h-full grid-rows-[repeat(7,1fr)] rounded-b-xl border-x border-b border-Gray30">
					{workHours.map((workHour, idx) => (
						<div
							key={idx}
							className="grid grid-cols-[1fr_2fr] border-t border-Gray30"
						>
							<div className="flex items-center justify-center border-r border-Gray30 py-3 text-Body02">
								{getDayOfWeek(workHour.dayOfWeek)}
							</div>

							<div className="flex items-center justify-center text-Body01">
								{getOpeningHoursString(workHour)}
							</div>
						</div>
					))}
				</div>
			</ModalBody>
		</ModalContent>
	)
}
