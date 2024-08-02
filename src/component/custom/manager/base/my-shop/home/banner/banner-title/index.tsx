import type { TResGetShopInfo } from "@/util/api-v2/get-shop-info"

type BannerTitlePT = {
	InfoData: TResGetShopInfo
}
export function BannerTitle({ InfoData }: BannerTitlePT) {
	return (
		<div className="absolute left-[90px] top-[95px]">
			<p className="text-Callout text-[14px] font-Light text-White">
				네일아트 전문 | {InfoData.address}
			</p>
			<h1 className="text-Title01 text-[28px] font-Bold text-White">
				{InfoData.shopName}
			</h1>
		</div>
	)
}
