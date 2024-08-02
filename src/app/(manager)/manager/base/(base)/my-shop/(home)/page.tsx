import { dehydrate, HydrationBoundary } from "@tanstack/react-query"

import ManagerBanner from "@/component/custom/manager/base/my-shop/home/banner"
import InfoCardList from "@/component/custom/manager/base/my-shop/home/info-card"
import RequiredReservationInfo from "@/component/custom/manager/base/my-shop/home/required-reservation-form"
import { getCacheClient } from "@/config/tanstack-query"
import { QUERY_SHOP_INFO_QUERY } from "@/constant"
import { getShopInfo } from "@/util/api-v2/get-shop-info"

export default async function Home() {
	const queryClient = getCacheClient()

	await queryClient.prefetchQuery({
		queryKey: [QUERY_SHOP_INFO_QUERY, 1],
		queryFn: async () => await getShopInfo(1),
	})
	return (
		<HydrationBoundary state={dehydrate(queryClient)}>
			<ManagerBanner />
			<div className="flex flex-col">
				<div className="flex flex-col gap-[20px] pb-[30px] pt-[20px]">
					<p className="text-Title03">내 샵 정보</p>
					<InfoCardList />
				</div>
				<hr className="h-[1.5px] w-full border-Gray10" />
				<div className="flex flex-col gap-[20px] pt-[20px]">
					<p className="text-Title03">필수 예약 사항</p>
					<RequiredReservationInfo />
				</div>
				<hr className="h-[1.5px] w-full border-Gray10" />
			</div>
		</HydrationBoundary>
	)
}
