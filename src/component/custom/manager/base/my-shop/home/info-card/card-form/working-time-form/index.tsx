import NTIcon from "@/component/common/nt-icon"
import type { TResGetShopInfo } from "@/util/api-v2/get-shop-info"

import {
	bulidMultipleHourList,
	separateHourList,
	bulidSingleHourList,
} from "./time-form.util"
type WorkingTimeFormPT = {
	InfoData: TResGetShopInfo
}
export function WorkingTimeForm({ InfoData }: WorkingTimeFormPT) {
	const days = ["일", "월", "화", "수", "목", "금", "토"]
	const openDays = InfoData.workHours.filter((data) => data.isOpen)
	const workWeek = openDays.map((data) => days[data.dayOfWeek]).join(" ")
	const { singleList, multipleList } = separateHourList(openDays)
	const formHourList = [
		...bulidMultipleHourList(multipleList),
		...bulidSingleHourList(singleList),
	] as { day: string; time: string }[]
	return (
		<div className="h-[100px] w-full overflow-y-scroll px-[12px]">
			<div className="flex flex-col justify-between">
				<div className="flex items-center">
					<NTIcon icon="dot" className="text-Gray60" />
					{workWeek}
				</div>
				{formHourList.map((data, idx) => (
					<div className="flex items-center" key={idx}>
						<NTIcon icon="dot" className="text-Gray60" />
						<div className="flex w-[210px] justify-between text-Body01 text-Gray60">
							<span>{data.day}</span> <span>{data.time}</span>
						</div>
					</div>
				))}
			</div>
		</div>
	)
}
