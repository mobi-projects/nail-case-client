"use client"

import BannerCarousel from "@/component/common/nt-banner-carousel"
import NTContent from "@/component/common/nt-content"
import ReservationPanelForm from "@/component/custom/manager/base/home/01"
import ReservationForm from "@/component/custom/manager/base/home/02"
import { NoticeCard } from "@/component/custom/post/notice-card"
import { useShopInfo } from "@/hook/use-common"
import { useBanner } from "@/hook/use-component"
import type { TShopInfo } from "@/type"

export default function Home() {
	const { carouselIdx, handleCarousel } = useBanner()
	const { shopInfo } = useShopInfo()
	if (!shopInfo) return <h1>Banner Image..</h1>
	return (
		<div className="flex flex-col gap-10 p-3">
			<div className="h-[380px] w-full">
				<BannerCarousel type="manager" handleCarousel={handleCarousel}>
					<BannerHeader shopInfo={shopInfo} />
					<BannerDesciption shopInfo={shopInfo} />
					<NTContent
						mode="dark"
						className="absolute right-10 top-12"
					>{`${carouselIdx + 1}/${shopInfo.srcArr.length}`}</NTContent>
				</BannerCarousel>
			</div>
			<div className="flex flex-col gap-5">
				<p className="block text-Title03">오늘 하루 예약 일정을 살펴볼게요.</p>
				<ReservationPanelForm />
				<ReservationForm />
			</div>

			<HomeDivider />

			<CardList />
		</div>
	)
}
type BannerItemPT = {
	shopInfo: TShopInfo
}
function BannerHeader({ shopInfo }: BannerItemPT) {
	const { specialty, address, shopName, todayAccess, totalAccess } = shopInfo
	return (
		<div className="absolute left-[64px] top-[48px] z-10">
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
		<div className="absolute left-[64px] top-[250px] z-10">
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

function HomeDivider() {
	return (
		<div className="relative h-[12px] w-full bg-White">
			<div className="absolute left-0 h-full w-full scale-[200%] border-y-2 border-[#80D6F8]/40 bg-White" />
		</div>
	)
}

function CardList() {
	const itemArr = Array.from({ length: 16 })
	return (
		<div className="flex h-fit w-[1200px] items-center overflow-y-hidden overflow-x-scroll">
			{itemArr.map((item, idx) => {
				return (
					<NoticeCard
						key={idx}
						id={0}
						category={"NEWS"}
						srcArr={[]}
						title={""}
						content={""}
						likes={0}
						views={0}
						comments={0}
						createdAt={{
							year: 0,
							month: 0,
							day: 0,
							hour: 0,
							minute: 0,
							division: "PM",
						}}
						commentArr={[]}
					/>
				)
			})}
		</div>
	)
}
