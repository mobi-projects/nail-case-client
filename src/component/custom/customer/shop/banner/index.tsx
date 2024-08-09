"use client"

import NTBannerImageCarousel from "@/component/common/nt-banner-image-carousel"
import NTContent from "@/component/common/nt-content"
import { useShopById } from "@/hook/use-shop-controller"
import type { TNailShopInfo } from "@/type"
import { isUndefined } from "@/util/common/type-guard"

import { BannerButtonList } from "./banner-button-list"
import { BannerTitle } from "./banner-tilte"
import { StatusMessage } from "./status-message"

export default function CustomerShopBanner({ shopId }: { shopId: number }) {
	const {
		data: shopInfo,
		isError: isErrorShopInfo,
		isPending: isPendingShopInfo,
	} = useShopById(shopId!)

	if (isErrorShopInfo || isPendingShopInfo || !shopInfo) {
		return (
			<StatusMessage
				isError={isErrorShopInfo}
				isPending={isPendingShopInfo}
				isUndefined={isUndefined(shopInfo)}
			/>
		)
	}

	const nailShopInfo: TNailShopInfo = shopInfo!.data

	console.log(nailShopInfo)

	return (
		<div className="flex h-[30rem] w-full flex-col gap-12 px-[75px] pt-20">
			<NTBannerImageCarousel className="absolute left-0 top-0 z-[-10] h-[30rem] w-full" />
			<BannerButtonList />
			<div className="flex h-fit w-full justify-between">
				<BannerTitle nailShopInfo={nailShopInfo} />
				<NTContent mode="dark">0/0</NTContent>
			</div>
		</div>
	)
}
