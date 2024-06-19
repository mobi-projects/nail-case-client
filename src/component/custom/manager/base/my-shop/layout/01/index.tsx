"use client"
import BannerCarousel from "@/component/common/nt-banner-carousel"
import NTContent from "@/component/common/nt-content"
import NTIcon from "@/component/common/nt-icon"
import { useShopInfo } from "@/hook/use-common"
import { useBanner } from "@/hook/use-component"
import type { TShopInfo } from "@/type"

type BannerItemPT = { shopInfo: TShopInfo }

export default function ManagerMyShopLayout() {
	return (
		<div className="h-fit w-full">
			<MyShopBanner />
			<Manager_Base_MyShop_Layout_01_02 />
		</div>
	)
}
function MyShopBanner() {
	const { handleCarousel, carouselIdx } = useBanner()
	const { shopInfo } = useShopInfo()
	if (!shopInfo)
		return <div className="h-[432.47px] w-full">Loading Banner....</div>
	return (
		<div className="h-[432.47px] w-full">
			<BannerCarousel type="manager" handleCarousel={handleCarousel}>
				<NTContent mode="dark" className="absolute left-[90px] top-10">
					미리보기
				</NTContent>
				<NTContent
					mode="dark"
					className="absolute left-[205px] top-10"
				>{`${carouselIdx + 1}/${shopInfo.srcArr.length}`}</NTContent>
				<NTIcon
					icon="setting"
					className="absolute right-12 top-10 h-6 w-6 text-White"
				/>
				<NTIcon
					icon="pencil"
					className="absolute right-12 top-[280px] h-6 w-6 text-White"
				/>
				<BannerHeader shopInfo={shopInfo} />
				<BannerDesciption shopInfo={shopInfo} />
			</BannerCarousel>
		</div>
	)
}

function BannerHeader({ shopInfo }: BannerItemPT) {
	const { specialty, address, shopName } = shopInfo
	return (
		<div className="absolute left-[90px] top-[95px]">
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
		<div className="absolute left-[90px] top-[280px] z-10">
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

function Manager_Base_MyShop_Layout_01_02() {
	return <div className="h-[44px] w-full border-[5px] border-green-300" />
}
