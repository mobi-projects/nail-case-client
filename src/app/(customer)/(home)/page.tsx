import { getCookie } from "cookies-next"
import { cookies } from "next/headers"

import CustomerHeader from "@/component/custom/customer/home/customer-header"
import PromotionSection from "@/component/custom/customer/home/promotion-section"
import RecomendShopList from "@/component/custom/customer/home/recomend-shop-list"
import ReservationSummary from "@/component/custom/customer/home/reservation-summary"
import { REFRESH_TOKEN } from "@/constant/auth-key"

export default async function CustomerHome() {
	const isLoggedIn = !!getCookie(REFRESH_TOKEN, { cookies }) // CustomerHome은 server 컴포넌트이기 때문에 serverCookie로 설정했습니다.
	return (
		<div className="flex h-fit flex-col pb-[7px]">
			<CustomerHeader />
			<PromotionSection />
			{isLoggedIn && <ReservationSummary />}
			<RecomendShopList />
		</div>
	)
}
