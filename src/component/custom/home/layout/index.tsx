"use client"
import BannerCarousel from "@/component/common/nt-banner-carousel"
import NTContent from "@/component/common/nt-content"
import NTIcon from "@/component/common/nt-icon"
import { useShopInfo } from "@/hook/use-common"
import { useBanner } from "@/hook/use-component"
import type { TShopInfo } from "@/type"

type BannerItemPT = {
	shopInfo: TShopInfo
}

export default function ShopShowCase() {
	const { handleCarousel, carouselIdx } = useBanner()
	const { shopInfo } = useShopInfo()
	if (!shopInfo)
		return <div className="h-[30rem] w-full">Loading Banner....</div>
	return (
		<div className="h-[30rem] w-full">
			<div className="absolute left-0 top-0 h-full w-full">
				<BannerCarousel type="user" handleCarousel={handleCarousel}>
					<NTIcon
						icon="back"
						className="absolute left-[310px] top-20 h-6 w-9 text-White"
					/>
					<NTIcon
						icon="home"
						className="absolute left-[345px] top-20 h-6 w-6 text-White"
					/>

					<NTIcon
						icon="share"
						className="absolute right-[360px] top-20 h-7 w-7 text-White"
					/>
					<BannerHeader shopInfo={shopInfo} />
					<NTContent
						mode="dark"
						className="absolute right-[360px] top-40"
					>{`${carouselIdx + 1}/${shopInfo.srcArr.length}`}</NTContent>
				</BannerCarousel>
				<BannerDesciption shopInfo={shopInfo} />
			</div>
		</div>
	)
}

function BannerHeader({ shopInfo }: BannerItemPT) {
	const { specialty, address, shopName } = shopInfo
	return (
		<div className="absolute left-[310px] top-40">
			<p className="text-Callout text-[14px] font-Light text-White">{`${specialty}  |  ${address}`}</p>
			<h1 className="text-Title01 text-[28px] font-Bold text-White">
				{shopName}
			</h1>
		</div>
	)
}

function BannerDesciption({ shopInfo }: BannerItemPT) {
	const { hashtagArr, overview } = shopInfo
	return (
		<div className="absolute left-[310px] top-80 z-10">
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
