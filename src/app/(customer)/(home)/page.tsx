import { getCookie } from "cookies-next"
import { cookies } from "next/headers"

import CustomerHeader from "@/component/custom/customer/home/customer-header"
import RecomendShopList from "@/component/custom/customer/home/popular-shop-list"
import PromotionSection from "@/component/custom/customer/home/promotion-section"
import ReservationSummary from "@/component/custom/customer/home/reservation-summary"
import { REFRESH_TOKEN } from "@/constant/auth-key"

export default async function CustomerHome() {
	const isLoggedIn = !!getCookie(REFRESH_TOKEN, { cookies })
	return (
		<div className="flex h-fit flex-col pb-[7px] max-xl:px-4">
			<CustomerHeader />
			<PromotionSection />
			{isLoggedIn && <ReservationSummary />}
			<div className="my-8 w-full border-b border-t-Gray20 pb-8 text-Title03 font-SemiBold md:text-[16px] max-sm:text-[14px] max-md:my-4 max-md:pb-4">
				NewTips 추천 샵
			</div>
			<RecomendShopList />
		</div>
	)
}
