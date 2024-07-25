import MyShopInfo from "@/component/custom/manager/base/my-shop/home/03"
import RequiredReservationInfo from "@/component/custom/manager/base/my-shop/home/04"
// import NoticeBoard from "@/component/custom/manager/base/my-shop/home/05"

export default function Home() {
	return (
		<div className="flex flex-col">
			<div className="flex flex-col gap-[20px] pb-[30px] pt-[20px]">
				<p className="text-Title03">내 샵 정보</p>
				<MyShopInfo />
			</div>
			<hr className="h-[1.5px] w-full border-Gray10" />
			<div className="flex flex-col gap-[20px] pt-[20px]">
				<p className="text-Title03">필수 예약 사항</p>
				<RequiredReservationInfo />
			</div>
			{/* <hr className="h-[1.5px] w-full border-Gray10" />
			<div className="flex flex-col gap-[20px] pt-[20px]">
				<div className="h-hit flex w-full items-center justify-between">
					<p className="text-Title03">공지</p>
					<p className="text-Headline02 text-Gray40">전체보기</p>
				</div>
				<NoticeBoard />
			</div> */}
		</div>
	)
}
