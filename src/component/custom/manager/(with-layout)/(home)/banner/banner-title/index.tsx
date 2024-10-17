import type { TResGetShopInfo } from "@/util/api/get-shop-info"

type BannerTitlePT = {
	infoData: TResGetShopInfo
}
export function BannerTitle({ infoData }: BannerTitlePT) {
	return (
		<div className="absolute left-[90px] top-[95px]">
			<p className="text-Callout text-[14px] font-Light text-White">
				네일아트 전문 | {infoData.address}
			</p>
			<h1 className="text-Title01 text-[28px] font-Bold text-White">
				{infoData.shopName}
			</h1>
		</div>
	)
}
