import type { CustomerShopBannerTitlePT } from ".."

export function BannerTitle({
	shopAddress,
	shopName,
}: CustomerShopBannerTitlePT) {
	return (
		<div className="flex flex-col gap-[6px]">
			<p className="text-Callout font-Light text-White">
				{`네일아트 전문 | ${shopAddress}`}
			</p>
			<p className="text-Title01 font-Bold text-White">{shopName}</p>
		</div>
	)
}
