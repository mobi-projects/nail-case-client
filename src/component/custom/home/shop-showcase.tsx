"use client"
import BannerCarousel from "@/component/common/nt-banner-carousel"
import NTContent from "@/component/common/nt-content"
import { useShopInfo } from "@/hook/use-common"
import { useBanner } from "@/hook/use-component"
import type { TShopInfo } from "@/type"

type BannerItemPT = {
	shopInfo: TShopInfo
}

export default function ShopShowCase() {
	const { handleCarousel, carouselIdx } = useBanner()
	const { shopInfo } = useShopInfo()
	if (!shopInfo) return <h1>Loading Banner....</h1>
	return (
		<div className="h-[30rem] w-full">
			<div className="absolute left-0 top-0 h-full w-full">
				<BannerCarousel type="user" handleCarousel={handleCarousel}>
					<BannerHeader shopInfo={shopInfo} />
					<BannerDesciption shopInfo={shopInfo} />
					<NTContent
						mode="dark"
						className="absolute right-80 top-24"
					>{`${carouselIdx + 1}/${shopInfo.srcArr.length}`}</NTContent>
				</BannerCarousel>
			</div>
		</div>
	)
}

function BannerHeader({ shopInfo }: BannerItemPT) {
	const { specialty, address, shopName, todayAccess, totalAccess } = shopInfo
	return (
		<div className="absolute left-60 top-24 z-10">
			<p className="text-Callout text-[14px] font-Light text-White">{`${specialty}  |  ${address}`}</p>
			<h1 className="text-Title01 text-[28px] font-Bold text-White">
				{shopName}
			</h1>
			<p className="text-Callout font-SemiBold text-Gray20">{`오늘 ${todayAccess.toLocaleString("ko-KR")} · 전체 ${totalAccess.toLocaleString("ko-KR")}`}</p>
		</div>
	)
}

function BannerDesciption({ shopInfo }: BannerItemPT) {
	const { hashtagArr, overview } = shopInfo
	return (
		<div className="absolute left-60 top-72 z-10">
			<div className="flex gap-3">
				{hashtagArr.map((hashtag, idx) => (
					<p
						key={idx}
						className="text-Body01 text-[18px] font-SemiBold text-White"
					>
						{hashtag}
					</p>
				))}
			</div>
			<p className="line-clamp-3 w-[500px] text-Body01 text-[18px] font-Regular text-Gray10">
				{overview}
			</p>
		</div>
	)
}
