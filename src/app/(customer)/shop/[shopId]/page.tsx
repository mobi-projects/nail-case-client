import Customer_Shop_01 from "@/component/custom/customer/shop/01"
import ReservationSchedule from "@/component/custom/customer/shop/02"
import { Customer_Shop_03 } from "@/component/custom/customer/shop/03"
import Customer_Shop_04 from "@/component/custom/customer/shop/04"
import Customer_Shop_05 from "@/component/custom/customer/shop/05"

type CustomerShopPT = {
	params: {
		shopId: number
	}
}
export default function CustomerShop({ params }: CustomerShopPT) {
	console.log(params) // [TODO] 추후 삭제: 미사용 변수가 잔여할 경우, 배포 불가 이유로 console 출력 중..
	return (
		<div className="h-full w-full">
			<Customer_Shop_01 />
			<div className="mt-[32px] flex w-full flex-col gap-[32px]">
				<div className="flex w-full flex-col gap-[20px]">
					<p className="text-Title02">예약 일시</p>
					<ReservationSchedule />
				</div>
				<Customer_Shop_03 />
				<Customer_Shop_04 />
				<div className="flex w-full flex-col gap-[20px]">
					<p className="text-Title02">네일샵 공지</p>
					<Customer_Shop_05 />
				</div>
			</div>
		</div>
	)
}
