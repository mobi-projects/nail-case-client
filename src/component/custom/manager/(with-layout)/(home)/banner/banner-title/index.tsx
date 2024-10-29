import type { TResGetShopInfo } from "@/util/api/get-shop-info"

type BannerTitlePT = {
	infoData: TResGetShopInfo
}
export function BannerTitle({ infoData }: BannerTitlePT) {
	return (
		<div>
			<p className="text-Callout text-[14px] font-Light text-White max-sm:max-w-44">
				네일아트 전문 | {infoData.address}
			</p>
			<h1 className="text-Title01 text-[28px] font-Bold text-White md:text-[20px] lg:text-[22px] max-sm:text-[16px]">
				{infoData.shopName}
			</h1>
		</div>
	)
}
