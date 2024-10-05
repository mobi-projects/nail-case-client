import {
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,
} from "@/component/common/nt-modal"
import type { TWorkHour } from "@/util/api-v2/get-shop-by-id"

import {
	getDayOfWeek,
	getOpeningHoursString,
} from "./daily-opening-hours/daily-opening-hours.util"

type WorkHourModaPT = { workHours: Array<TWorkHour> }

export default function WorkHourModal({ workHours }: WorkHourModaPT) {
	return (
		<div className="flex flex-col">
			<ModalContent className="gap-4">
				<ModalHeader className="grid w-full grid-cols-[1fr_2fr] rounded-t-[22px] border border-gray-500">
					<div className="flex items-center justify-center border-r border-gray-500 py-3 text-Headline02 text-lg">
						요일
					</div>
					<div className="flex items-center justify-center text-Headline02 text-lg">
						영업시간
					</div>
				</ModalHeader>
				<ModalBody className="w-full">
					<div className="grid grid-rows-[repeat(7,1fr)] rounded-b-[22px] border-x border-b border-gray-500">
						{workHours.map((workHour, idx) => (
							<div
								key={idx}
								className="grid grid-cols-[1fr_2fr] border-t border-gray-500"
							>
								<div className="flex items-center justify-center border-r border-gray-500 py-3 text-Body02">
									{getDayOfWeek(workHour.dayOfWeek)}
								</div>

								<div className="flex items-center justify-center text-Body01">
									{getOpeningHoursString(workHour)}
								</div>
							</div>
						))}
					</div>
				</ModalBody>
				<ModalFooter className="h-[50px]" />
			</ModalContent>
		</div>
	)
}
