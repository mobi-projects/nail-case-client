import CustomerHeader from "@/component/custom/customer/home/customer-header"
import RecomendShopList from "@/component/custom/customer/home/popular-shop-list"
import PromotionSection from "@/component/custom/customer/home/promotion-section"
import ReservationSummary from "@/component/custom/customer/home/reservation-summary"

export default async function CustomerHome() {
	return (
		<div className="flex h-fit flex-col pb-[7px]">
			<CustomerHeader />
			<PromotionSection />
			<ReservationSummary />
			<div className="mb-4 w-full border-b border-t-Gray20 pb-8 text-Title03 font-SemiBold">
				NewTips 추천 샵
			</div>
			<RecomendShopList />
		</div>
	)
}
