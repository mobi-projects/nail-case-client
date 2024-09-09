import type { TResGetShop } from "@/util/api-v2/get-shop-by-id"

export function BannerTitle({ nailShopInfo }: { nailShopInfo: TResGetShop }) {
	const { address, shopName } = nailShopInfo

	return (
		<div className="flex flex-col gap-[6px]">
			<p className="text-Callout font-Light text-White">
				{`네일아트 전문 | ${address}`}
			</p>
			<p className="text-Title01 font-Bold text-White">{shopName}</p>
		</div>
	)
}
