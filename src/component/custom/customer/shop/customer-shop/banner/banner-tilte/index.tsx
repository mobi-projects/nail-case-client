export type BannerTitlePT = {
	shopAddress: string
	shopName: string
}
export function BannerTitle({ shopAddress, shopName }: BannerTitlePT) {
	return (
		<div className="flex flex-col gap-y-[6px] max-sm:gap-y-0">
			<p className="text-Callout font-Light text-White max-sm:max-w-44">
				{`네일아트 전문 | ${shopAddress}`}
			</p>
			<p className="text-Title01 font-Bold text-White md:text-[20px] lg:text-[22px] max-sm:text-[16px]">
				{shopName}
			</p>
		</div>
	)
}
