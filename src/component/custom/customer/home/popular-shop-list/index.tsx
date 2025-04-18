"use client"

import NTLoadingSpinner from "@/component/common/nt-loading-spinner"
import { isUndefined } from "@/util/common/type-guard"

import { useInfiniteScroll } from "./popluar-shop-list.hook"
import { PopularShopCard } from "./popular-shop-card"
import ShopListError from "./shop-list-error"
import { ShopListSkeleton } from "./shop-list-skeleton"

export default function PopularShopList() {
	const { data, hasNextPage, isLoading, spinnerRef, isError } =
		useInfiniteScroll(6)

	if (isLoading || isUndefined(data)) return <ShopListSkeleton />
	if (isError) return <ShopListError />
	return (
		<div className="flex h-fit w-full flex-col gap-[20px] pb-5">
			<div className="flex w-full flex-wrap items-start justify-center gap-[24px] pt-3 max-sm:gap-[14px]">
				{data.pages.map((info) =>
					info.shopList.map((shop, idx) => {
						return <PopularShopCard key={idx} shop={shop} />
					}),
				)}
			</div>
			{hasNextPage && (
				<div
					ref={spinnerRef}
					className="flex h-24 w-full flex-col items-center justify-center gap-y-3"
				>
					<NTLoadingSpinner size="medium" />
				</div>
			)}
		</div>
	)
}
