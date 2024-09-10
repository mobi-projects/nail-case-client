"use client"

import NTBannerImageCarousel from "@/component/common/nt-banner-image-carousel"
import NTContent from "@/component/common/nt-content"

import { BannerButtonList } from "./banner-button-list"
import { BannerTitle } from "./banner-tilte"

export type CustomerShopBannerTitlePT = {
	shopAddress: string
	shopName: string
}
export default function CustomerShopBanner({
	shopAddress,
	shopName,
}: CustomerShopBannerTitlePT) {
	return (
		<div className="flex h-[30rem] w-full flex-col gap-12 px-[75px] pt-20">
			<NTBannerImageCarousel className="absolute left-0 top-0 z-[-10] h-[30rem] w-full" />
			<BannerButtonList />
			<div className="flex h-fit w-full justify-between">
				<BannerTitle shopAddress={shopAddress} shopName={shopName} />
				<NTContent mode="dark">0/0</NTContent>
			</div>
		</div>
	)
}
