import NTIcon from "@/component/common/nt-icon"
import type { TResGetShopInfo } from "@/util/api_v2/get-shop-Info"

import { HourFrom } from "./hours-form/index"
import { bulidWorkingTimeFormList, unixTimeForm } from "./hours.util"

type OpeningHourPT = TResGetShopInfo

export default function OpeningHours({ workHours }: OpeningHourPT) {
	return (
		<div className="flex flex-col py-2">
			<div className="pb-2 text-Headline02 text-Gray80">영업시간</div>
			{workHours.map((data, idx) => {
				const { unixDay, openTime, closeTime } = bulidWorkingTimeFormList(data)
				const unixOpenTime = unixTimeForm(openTime)
				const unixCloseTime = unixTimeForm(closeTime)
				return (
					<div className="flex w-full items-center gap-x-3 pb-3" key={idx}>
						<NTIcon icon="dot" className="h-7 w-7" />
						<p className="text-Body01 text-Gray70">{unixDay}</p>
						{data.isOpen ? (
							<div className="flex w-96 justify-between gap-x-1 px-8">
								<HourFrom title="OPEN" time={unixOpenTime} />
								<HourFrom title="CLOSE" time={unixCloseTime} />
							</div>
						) : (
							<div className="flex w-96 justify-between gap-x-1 px-8">
								<HourFrom title="OPEN" time="휴무" />

								<HourFrom title="CLOSE" time="휴무" />
							</div>
						)}
					</div>
				)
			})}
		</div>
	)
}
