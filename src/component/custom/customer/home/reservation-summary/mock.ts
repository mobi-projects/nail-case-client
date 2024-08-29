import { ImageMockList } from "@/app/(customer)/(home)/mockData"
import type { TResMainPageData } from "@/util/api-v2/get-main-page-data"

// mock 데이터 아직 등록된 예약이 없어서 임시로 예약정보 가져옴
export const Mock: TResMainPageData = {
	recentReservation: {
		reservationId: 1,
		shop: {
			id: 1,
			name: "모비네일 윤신",
			imageSrc: ImageMockList[0],
		},
		details: [
			{
				reservationDetailsId: 123,
				startTime: 1111111111,
				endTime: 1111111111,
				treatmentOption: ["AOM"],
				removeOption: "IN_SHOP",
				conditionOptions: ["REPAIR"],
				status: "PENDING",
			},
		],
	},
}
