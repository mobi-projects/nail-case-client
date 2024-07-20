import { dehydrate, HydrationBoundary } from "@tanstack/react-query"

import ReservationList from "@/component/custom/manager/base/schedule/list/reservation-list"
import getQueryClient from "@/config/tanstack-query/get-query-client"
import { MANAGER_QUERY } from "@/config/tanstack-query/key-factory"
import type { TReservationStatus } from "@/type/union-option/resesrvation-status"

const SCHEDULE_STATUS_ARR: TReservationStatus[] = [
	"PENDING",
	"CONFIRMED",
	"COMPLETED",
	"REJECTED",
] as const

export default async function ScheduleList() {
	//[todo] 추후 수정, shopId 동적 확보
	const shopId = 1
	const dehydrateState = await fetchAtServer(shopId)
	return (
		<div className="flex flex-col gap-[20px]">
			<HydrationBoundary state={dehydrateState}>
				{SCHEDULE_STATUS_ARR.map((status, idx) => (
					<ReservationList
						shopId={1}
						key={idx}
						statusIdx={idx}
						status={status}
					/>
				))}
			</HydrationBoundary>
		</div>
	)
}

const fetchAtServer = async (shopId: number) => {
	const queryClient = getQueryClient()
	queryClient.prefetchQuery(MANAGER_QUERY.scheduleList(shopId))
	return dehydrate(queryClient)
}
