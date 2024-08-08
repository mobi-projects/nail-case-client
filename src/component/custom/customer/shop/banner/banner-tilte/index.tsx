import type { TNailShopInfo } from "@/type"

export function BannerTitle({ nailShopInfo }: { nailShopInfo: TNailShopInfo }) {
	const location = nailShopInfo.address
	const shopName = nailShopInfo.shopName

	return (
		<div className="absolute left-64 top-40 h-fit w-fit">
			<div className="flex flex-col gap-[6px]">
				<p className="text-Callout font-Light text-White">
					{`네일아트 전문 | ${location}`}
				</p>
				<p className="text-Title01 font-Bold text-White">{shopName}</p>
			</div>
		</div>
	)
}
