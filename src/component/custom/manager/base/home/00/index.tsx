"use client"
import BannerCarousel from "@/component/common/nt-banner-carousel"
import NTContent from "@/component/common/nt-content"
import { useShopInfo } from "@/hook/use-common"
import { useBanner } from "@/hook/use-component"
import type { TShopInfo } from "@/type"

export default function HomeBanner() {
	const { carouselIdx, handleCarousel } = useBanner()
	const { shopInfo } = useShopInfo()
	if (!shopInfo) return <h1>Banner Image..</h1>
	return (
		<div className="h-[380px] w-full">
			<BannerCarousel type="managerBase" handleCarousel={handleCarousel}>
				<BannerHeader shopInfo={shopInfo} />
				<BannerDesciption shopInfo={shopInfo} />
				<NTContent
					mode="dark"
					className="absolute right-[78px] top-[62px]"
				>{`${carouselIdx + 1}/${shopInfo.srcArr.length}`}</NTContent>
			</BannerCarousel>
		</div>
	)
}
type BannerItemPT = {
	shopInfo: TShopInfo
}
function BannerHeader({ shopInfo }: BannerItemPT) {
	const { specialty, address, shopName, todayAccess, totalAccess } = shopInfo
	return (
		<div className="absolute left-[64px] top-[52.5px] z-10">
			<p className="text-Callout text-[14px] font-Light text-White">{`${specialty}  |  ${address}`}</p>
			<h1 className="pt-[5.5px] text-Title01 text-[28px] font-Bold text-White">
				{shopName}
			</h1>
			<p className="pt-[3px] text-Callout font-SemiBold text-Gray20">{`오늘 ${todayAccess.toLocaleString(
				"ko-KR",
			)} · 전체 ${totalAccess.toLocaleString("ko-KR")}`}</p>
		</div>
	)
}

function BannerDesciption({ shopInfo }: BannerItemPT) {
	const { hashtagArr, overview } = shopInfo
	return (
		<div className="absolute left-[64px] top-[239px] z-10">
			<div className="flex gap-[13px]">
				{hashtagArr.map((hashtag, idx) => (
					<p
						key={idx}
						className="text-Body01 text-[18px] font-SemiBold text-White"
					>
						{hashtag}
					</p>
				))}
			</div>
			<p className="line-clamp-3 w-[500px] text-Body01 text-[18px] font-Regular text-White">
				{overview}
			</p>
		</div>
	)
}
