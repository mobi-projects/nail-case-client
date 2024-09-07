import { cn } from "@/config/tailwind"
import type { TResGetShopInfo } from "@/util/api-v2/get-shop-info"

import { DigitalFormat } from "./digital-format"
import { bulidWorkingTimeFormList, separateHourMin } from "./hour.util"

export default function OpeningHours({ workHours }: TResGetShopInfo) {
	return (
		<div className="flex flex-col py-2">
			<div className="pb-2 text-Headline02 text-Gray80">영업시간</div>
			{workHours.map((time) => {
				const { unixDay, openTime, closeTime } = bulidWorkingTimeFormList(time)
				const { hour: openHour, minute: openMinute } = separateHourMin(openTime)
				const { hour: closeHour, minute: closeMinute } =
					separateHourMin(closeTime)
				return (
					<div
						className="flex w-full items-center gap-x-3 pb-3"
						key={time.dayOfWeek}
					>
						<div
							className={cn(
								"h-2 w-2 rounded-full ring-2",
								time.isOpen ? "bg-PB100 ring-PB50" : "bg-Gray40 ring-Gray20",
							)}
						/>
						<p
							className={cn(
								"text-Body01",
								time.isOpen ? "text-Black" : "text-Gray40",
							)}
						>
							{unixDay}
						</p>

						<div className="flex w-96 items-center justify-between gap-x-1 px-8">
							<DigitalFormat
								title="OPEN"
								hour={openHour.toString()}
								minute={openMinute.toString().padStart(2, "0")}
								isOpen={time.isOpen}
							/>
							<DigitalFormat
								title="CLOSE"
								hour={closeHour.toString()}
								minute={closeMinute.toString().padStart(2, "0")}
								isOpen={time.isOpen}
							/>
						</div>
					</div>
				)
			})}
		</div>
	)
}
