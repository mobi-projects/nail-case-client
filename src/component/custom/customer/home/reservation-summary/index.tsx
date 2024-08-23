"use client"
import { useQuery } from "@tanstack/react-query"

import { ImageMockList } from "@/app/(customer)/(home)/mockData"
import type { TResMainPageData } from "@/util/api-v2/get-main-page-data"
import { getMainPageData } from "@/util/api-v2/get-main-page-data"

import { ReservationImageList } from "./reservation-image-list"
import ReservationInfo from "./reservation-info"

// mock 데이터 아직 등록된 예약이 없어서 임시로 예약정보 가져옴
const Mock: TResMainPageData = {
	recentReservation: {
		reservationId: 1,
		shop: {
			id: 1,
			name: "모비네일 윤신",
		},
		details: [
			{
				reservationDetailsId: 123,
				startTime: 1111111111,
				endTime: 1111111111,
				treatmentOptions: ["AOM", "MEMBER_IMAGE"],
				removeOption: "IN_SHOP",
				conditionOptions: ["REPAIR"],
				accompanied: false,
				status: "PENDING",
			},
		],
	},
}

export default function ReservationSummary() {
	const { data, isLoading } = useQuery({
		queryKey: ["test"],
		queryFn: getMainPageData,
	})
	if (isLoading) return
	console.log(data, "예약정보 불러오기")
	return (
		<div className="my-10 flex flex-col rounded-3xl border border-PB90/10 bg-White p-8 shadow-customGray60">
			<div className="text-Title03 font-Bold text-PB100">진행 중인 네일 </div>
			<div className="flex gap-[16px]">
				<ReservationImageList imageList={ImageMockList} />
				<ReservationInfo recentReservation={Mock.recentReservation} />
			</div>
		</div>
	)
}
