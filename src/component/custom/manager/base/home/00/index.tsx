"use client"
import NTBannerImageCarousel from "@/component/common/nt-banner-image-carousel"
import NTContent from "@/component/common/nt-content"
import { useShopById } from "@/hook/use-shop-controller"
import type { TResGetShopById } from "@/type/shop"

export default function ManagerBaseHomeBanner() {
	const { data, isError, error, isLoading } = useShopById(1)

	if (isError) {
		return <div>Error: {error.message}</div>
	}
	if (isLoading) {
		return <div>Loading...</div>
	}
	const shopData = data?.data as TResGetShopById
	return (
		<div className="relative h-[380px] w-full">
			<NTBannerImageCarousel className="absolute left-0 h-full w-full bg-transparent" />
			<BannerHeader shopData={shopData} />
			<BannerDescription shopData={shopData} />
			<NTContent mode="dark" className="absolute right-[78px] top-[62px]">
				{`${shopData.images?.length.toString() || "0"} /${shopData.images?.length.toString() || 0}`}
			</NTContent>
		</div>
	)
}
type BannerHeaderPT = { shopData: TResGetShopById }
function BannerHeader({ shopData }: BannerHeaderPT) {
	const shopAddress = shopData.address.split(" ").slice(0, 2).join(" ")
	return (
		<div className="absolute left-[6%] top-[52.5px]">
			<p className="text-Callout text-[14px] font-Light text-White">
				네일아트 전문 | {shopAddress}
			</p>
			<h1 className="pt-[5.5px] text-Title01 text-[28px] font-Bold text-White">
				{shopData.shopName}
			</h1>
			<p className="pt-[3px] text-Callout font-SemiBold text-Gray20">
				✨ 평점 : {shopData.shopAvgRatings}
			</p>
		</div>
	)
}

function BannerDescription({ shopData }: BannerHeaderPT) {
	const tagList = shopData.tags.map((tag) => `#${tag}`).join(" ")
	return (
		<div className="absolute left-[64px] top-[239px] z-10 flex flex-col gap-4">
			<div className="flex gap-[13px]">
				<p className="text-Body01 text-[18px] font-SemiBold text-White">
					{tagList}
				</p>
			</div>
			<p className="line-clamp-3 w-[500px] whitespace-pre-wrap text-Body01 text-[18px] font-Regular text-White">
				{shopData.overview}
			</p>
		</div>
	)
}
