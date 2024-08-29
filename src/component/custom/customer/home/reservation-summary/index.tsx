"use client"

import { Mock } from "./mock"
import ReservationDetail from "./reservation-detail"

export default function ReservationSummary() {
	// test환경에서 query호출용으로 작성된 코드입니다. ** api 작성 pr에서 변경하겠습니다.
	// const { data, isLoading } = useQuery({
	// 	queryKey: ["test"],
	// 	queryFn: getMainPageData,
	// })
	// if (isLoading) return
	return (
		<div className="my-10 h-fit w-full">
			<div className="pb-4 text-Title03 font-SemiBold">진행 중인 네일 </div>
			<div className="w-full rounded-3xl bg-White px-8 py-4 shadow-customGray60">
				<ReservationDetail recentReservation={Mock.recentReservation} />
			</div>
		</div>
	)
}
