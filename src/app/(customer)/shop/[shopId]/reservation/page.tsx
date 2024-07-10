import { NTButton } from "@/component/common/atom/nt-button"
import CustomerShopReservationHeader from "@/component/custom/customer/shop/reservation/01"
import Companion from "@/component/custom/customer/shop/reservation/02"
import Artist from "@/component/custom/customer/shop/reservation/03"
import TreatmentNCondition from "@/component/custom/customer/shop/reservation/04"
import ScheduleSelection from "@/component/custom/customer/shop/reservation/05"
import { ExpandableToggle } from "@/component/custom/customer/shop/reservation/common/expandable-toggle"

type CustomerShopPT = {
	params: {
		shopId: number
	}
}

export default function CustomerShopReservation({ params }: CustomerShopPT) {
	console.log(params)
	return (
		<main className="h-fit w-full">
			<CustomerShopReservationHeader name="모비네일 한남" />
			<div className="flex h-fit w-full flex-col gap-[30px] py-4">
				<ExpandableToggle title="동반 인원">
					<Companion maxCompanion={RESERVATION_MOCK_DATA.maxCompanion} />
				</ExpandableToggle>
				<ExpandableToggle title="아티스트">
					<Artist artistArr={[...RESERVATION_MOCK_DATA.artistArr]} />
				</ExpandableToggle>
				<ExpandableToggle title="시술 세부 내용">
					<TreatmentNCondition />
				</ExpandableToggle>
				<ExpandableToggle title="시술 일정">
					<ScheduleSelection
						availableArr={JSON.parse(
							JSON.stringify(RESERVATION_MOCK_DATA.availableArtistArr),
						)}
					/>
				</ExpandableToggle>
			</div>

			<div className="my-[100px] flex h-fit w-full items-center justify-center">
				<NTButton disabled>예약하기</NTButton>
			</div>
		</main>
	)
}

const RESERVATION_MOCK_DATA = {
	maxCompanion: 5,
	artistArr: [
		"모비쌤",
		"비모쌤",
		"피넛쌤",
		"케이쌤",
		"제로쌤",
		"조이쌤",
		"제인쌤",
		"알루미늄쌤",
	],
	availableArtistArr: [
		{
			time: 1720490400,
			availableSeats: 1,
			artists: [
				{
					id: 1,
					nickname: "모비쌤",
					enable: true,
					near: 600, // 10분
				},
				{
					id: 2,
					nickname: "비모쌤",
					enable: false,
					near: 0, // 해당시간 시술중
				},
				{
					id: 3,
					nickname: "피넛쌤",
					enable: false,
					near: 0, // 해당시간 시술중
				},
			],
		},
		{
			time: 1720494000,
			availableSeats: 4,
			artists: [
				{
					id: 1,
					nickname: "모비쌤",
					enable: true,
					near: 3600,
				},
				{
					id: 2,
					nickname: "비모쌤",
					enable: true,
					near: 600,
				},
				{
					id: 3,
					nickname: "피넛쌤",
					enable: false,
					near: 0, // 해당시간 시술중
				},
			],
		},
		{
			time: 1720497600,
			availableSeats: 3, // 목데이터 만들어서 기능테스트 하고 있습니다.
			artists: [
				{
					id: 1,
					nickname: "모비쌤",
					enable: false,
					near: 0, // 해당시간 시술중
				},
				{
					id: 2,
					nickname: "비모쌤",
					enable: false,
					near: 0, // 해당시간 시술중
				},
				{
					id: 3,
					nickname: "피넛쌤",
					enable: false,
					near: 0, // 해당시간 시술중
				},
			],
		},
		{
			time: 1720501200, // 2024년 x월 x일 10:00시
			availableSeats: 5,
			artists: [
				{
					id: 1,
					nickname: "모비쌤",
					enable: true,
					near: 1200,
				},
				{
					id: 2,
					nickname: "비모쌤",
					enable: true,
					near: 1800,
				},
				{
					id: 3,
					nickname: "피넛쌤",
					enable: true,
					near: 4600,
				},
			],
		},
		{
			time: 1720504800, // 2024년 x월 x일 10:00시
			availableSeats: 3,
			artists: [
				{
					id: 1,
					nickname: "모비쌤",
					enable: false,
					near: 0, // 해당시간 시술중
				},
				{
					id: 2,
					nickname: "비모쌤",
					enable: true,
					near: 1800,
				},
				{
					id: 3,
					nickname: "피넛쌤",
					enable: true,
					near: 7200,
				},
			],
		},
		{
			time: 1720508400, // 2024년 x월 x일 10:00시
			availableSeats: 3,
			artists: [
				{
					id: 1,
					nickname: "모비쌤",
					enable: true,
					near: 4200, // 해당시간 시술중
				},
				{
					id: 2,
					nickname: "비모쌤",
					enable: false,
					near: 0, // 해당시간 시술중
				},
				{
					id: 3,
					nickname: "피넛쌤",
					enable: false,
					near: 0, // 해당시간 시술중
				},
			],
		},
		{
			time: 1720512000, // 2024년 x월 x일 10:00시
			availableSeats: 3,
			artists: [
				{
					id: 1,
					nickname: "모비쌤",
					enable: true,
					near: 18000,
				},
				{
					id: 2,
					nickname: "비모쌤",
					enable: false,
					near: 0, // 해당시간 시술중
				},
				{
					id: 3,
					nickname: "피넛쌤",
					enable: false,
					near: 0, // 해당시간 시술중
				},
			],
		},
		{
			time: 1720515600, // 2024년 x월 x일 10:00시
			availableSeats: 3,
			artists: [
				{
					id: 1,
					nickname: "모비쌤",
					enable: true,
					near: 36000,
				},
				{
					id: 2,
					nickname: "비모쌤",
					enable: false,
					near: 0, // 해당시간 시술중
				},
				{
					id: 3,
					nickname: "피넛쌤",
					enable: false,
					near: 0, // 해당시간 시술중
				},
			],
		},
		{
			time: 1720519200, // 2024년 x월 x일 10:00시
			availableSeats: 3,
			artists: [
				{
					id: 1,
					nickname: "모비쌤",
					enable: true,
					near: 18000,
				},
				{
					id: 2,
					nickname: "비모쌤",
					enable: false,
					near: 0, // 해당시간 시술중
				},
				{
					id: 3,
					nickname: "피넛쌤",
					enable: false,
					near: 0, // 해당시간 시술중
				},
			],
		},
	],
} as const

// const useArtistList = (shopId: number) =>
// 	useQuery({
// 		queryKey: ["artist"],
// 		queryFn: async () => await getArtistList(shopId),
// 	})
// const useAvailableTime = (shopId: number) =>
// 	useQuery({
// 		queryKey: ["available-time"],
// 		queryFn: async () => await getAvailableTime(shopId),
// 	})

// const getArtistList = async (shopId: number) => {
// 	const response = await axiosInstance().get(`/asdf/${shopId}`)
// 	return response.data
// }
// const getAvailableTime = async (shopId: number) => {
// 	const response = await axiosInstance().get(`/asdfjk/${shopId}`)
// 	return response.data
// }
