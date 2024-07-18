import { dehydrate, HydrationBoundary } from "@tanstack/react-query"

import ReservationList from "@/component/custom/manager/base/schedule/list/reservation-list"
import getQueryClient from "@/config/tanstack-query/get-query-client"
import { managerQuery } from "@/config/tanstack-query/key-factory"
import type { TReservationStatus } from "@/type/union-option/resesrvation-status"

export default async function ScheduleList() {
	//[todo] 추후 수정, shopId 동적 확보
	const dehydrateState = await fetchAtServer(1)
	const statusArr: TReservationStatus[] = [
		"PENDING",
		"CONFIRMED",
		"COMPLETED",
		"REJECTED",
	]
	return (
		<div className="flex flex-col gap-[20px]">
			<HydrationBoundary state={dehydrateState}>
				{statusArr.map((status, idx) => (
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
	queryClient.prefetchQuery(managerQuery.scheduleList(shopId))
	return dehydrate(queryClient)
}
