import ShopShowCase from "@/component/custom/customer/shop/01"
import ReservationSchedule from "@/component/custom/customer/shop/02"
import CustomerNaviBar from "@/component/custom/customer/shop/03"
import ShopInfoCardList from "@/component/custom/customer/shop/04"
import PostCardList from "@/component/custom/customer/shop/05"

type CustomerShopPT = {
	params: {
		shopId: number
	}
}
export default function CustomerShop({ params }: CustomerShopPT) {
	console.log(params) // [TODO] 추후 삭제: 미사용 변수가 잔여할 경우, 배포 불가 이유로 console 출력 중..
	return (
		<div className="h-full w-full">
			<ShopShowCase />
			<div className="mt-[32px] flex w-full flex-col gap-[32px]">
				<div className="flex w-full flex-col gap-[20px]">
					<p className="text-Title02">예약 일시</p>
					<ReservationSchedule />
				</div>
				<CustomerNaviBar />
				<ShopInfoCardList />
				<div className="flex w-full flex-col gap-[20px]">
					<p className="text-Title02">네일샵 공지</p>
					<PostCardList />
				</div>
			</div>
		</div>
	)
}
