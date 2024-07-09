import CustomerShopBanner from "@/component/custom/customer/shop/01"
import ReservationSchedule from "@/component/custom/customer/shop/02"
import CustomerNaviBar from "@/component/custom/customer/shop/03"
import ShopInfoCardList from "@/component/custom/customer/shop/04"
import PostCardList from "@/component/custom/customer/shop/05"
import { convertStringToInteger } from "@/util/common"

type CustomerShopPT = {
	params: {
		shopId: number
	}
}
export default function CustomerShop({ params }: CustomerShopPT) {
	return (
		<div className="h-full w-full">
			<CustomerShopBanner />
			<div className="mt-[32px] flex w-full flex-col gap-[32px]">
				<div className="flex w-full flex-col gap-[20px]">
					<p className="text-Title02">예약 일시</p>
					<ReservationSchedule shopId={convertStringToInteger(params.shopId)} />
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
