import { getCookie } from "cookies-next"
import { cookies } from "next/headers"

import CustomerHeader from "@/component/custom/customer/home/customer-header"
import RecomendShopList from "@/component/custom/customer/home/popular-shop-list"
import PromotionSection from "@/component/custom/customer/home/promotion-section"
import ReservationSummary from "@/component/custom/customer/home/reservation-summary"
import { REFRESH_TOKEN } from "@/constant/auth-key"

export default async function CustomerHome() {
	const isLoggedIn = !!getCookie(REFRESH_TOKEN, { cookies }) // CustomerHome은 server 컴포넌트이기 때문에 serverCookie로 설정했습니다.
	return (
		<div className="flex h-fit flex-col pb-[7px]">
			<CustomerHeader isLoggedIn={isLoggedIn} />
			<PromotionSection />
			{isLoggedIn && <ReservationSummary />}
			<div className="mb-4 w-full border-b border-t-Gray20 pb-8 text-Title03 font-SemiBold">
				NewTips 추천 샵
			</div>
			<RecomendShopList />
		</div>
	)
}
