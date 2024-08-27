"use client"

import { useQuery } from "@tanstack/react-query"

import { getTopPopularShops } from "@/util/api-v2/get-top-popular-shops"
import { isUndefined } from "@/util/common/type-guard"

import { PopularShopCard } from "./popular-shop-card"
import { ShopListSkeleton } from "./shop-list-skeleton"

export default function RecomendShopList() {
	const { data: shopData, isLoading } = useQuery({
		queryKey: ["shop-list"],
		queryFn: () => getTopPopularShops({ page: 0, size: 6 }),
	})

	if (isLoading || isUndefined(shopData)) return <ShopListSkeleton />
	const { data } = shopData
	return (
		<div className="flex h-fit w-full flex-col gap-[20px]">
			<div className="flex flex-wrap gap-[24px] pt-3">
				{data.shopList.map((shop) => {
					return <PopularShopCard key={shop.shopId} shop={shop} />
				})}
			</div>
		</div>
	)
}
