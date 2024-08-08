import NTIcon from "@/component/common/nt-icon"
import type { TResGetShopInfo } from "@/util/api-v2/get-shop-info"

import { DigitalFormat } from "./digital-format"
import { bulidWorkingTimeFormList, separateHourMin } from "./hour.util"

type OpeningHourPT = TResGetShopInfo

export default function OpeningHours({ workHours }: OpeningHourPT) {
	return (
		<div className="flex flex-col py-2">
			<div className="pb-2 text-Headline02 text-Gray80">영업시간</div>
			{workHours.map((data, idx) => {
				const { unixDay, openTime, closeTime } = bulidWorkingTimeFormList(data)
				const { hour: openHour, minute: openMinute } = separateHourMin(openTime)
				const { hour: closeHour, minute: closeMinute } =
					separateHourMin(closeTime)
				return (
					<div className="flex w-full items-center gap-x-3 pb-3" key={idx}>
						<NTIcon icon="dot" className="h-7 w-7" />
						<p className="text-Body01 text-Gray70">{unixDay}</p>

						<div className="flex w-96 justify-between gap-x-1 px-8">
							<DigitalFormat
								title="OPEN"
								hour={openHour.toString()}
								minute={openMinute.toString().padStart(2, "0")}
								isOpen={data.isOpen}
							/>
							<DigitalFormat
								title="CLOSE"
								hour={closeHour.toString()}
								minute={closeMinute.toString().padStart(2, "0")}
								isOpen={data.isOpen}
							/>
						</div>
					</div>
				)
			})}
		</div>
	)
}
