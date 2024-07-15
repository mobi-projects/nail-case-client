"use client"

import NTBannerImageCarousel from "@/component/common/nt-banner-image-carousel"
import NTContent from "@/component/common/nt-content"
import NTIcon from "@/component/common/nt-icon"

import { useScroll } from "../05/scroll-context"

export default function CustomerShopBanner() {
	return (
		<div className="flex h-[480px] w-full">
			<NTBannerImageCarousel className="absolute left-0 h-[480px] w-full" />
			<PageRoutingIconButtons />
			<ShareIconButtons />
			<NTContent mode="dark" className="absolute right-64 top-40">
				0/0
			</NTContent>
			<ShopBasic />
			<BannerDescription />
		</div>
	)
}
function PageRoutingIconButtons() {
	return (
		<div className="absolute left-64 top-[78px] flex h-full w-7 gap-2">
			<NTIcon
				className="aspect-square w-7 text-White drop-shadow-[0_0_1px_rgba(0,0,0,0.9)] hover:cursor-pointer"
				icon="back"
			/>
			<NTIcon
				className="aspect-square w-7 text-White drop-shadow-[0_0_1px_rgba(0,0,0,0.9)] hover:cursor-pointer"
				icon="homeLight"
			/>
		</div>
	)
}

function ShareIconButtons() {
	return (
		<NTIcon
			className="absolute right-64 top-[78px] aspect-square w-7 text-White drop-shadow-[0_0_1px_rgba(0,0,0,0.9)] hover:cursor-pointer"
			icon="share"
		/>
	)
}
function ShopBasic() {
	const category = "네일아트 전문"
	const location = "서울시 용산구"
	const shopName = "모비네일 한남"
	const starRating = 3.2
	const reviewCount = 32
	return (
		<div className="absolute left-64 top-40 h-fit w-fit">
			<div className="flex flex-col gap-[6px]">
				<p className="text-Callout font-Light text-White">
					{category} | {location}
				</p>
				<p className="text-Title01 font-Bold text-White">{shopName}</p>
			</div>
			<div className="flex items-center gap-4">
				<FiveStars {...{ starRating }} />
				<p className="text-Body02 font-Bold text-White">{starRating}</p>
				<ReviewNotice {...{ reviewCount }} />
			</div>
		</div>
	)
}

function FiveStars({ starRating }: { starRating: number }) {
	let cntFilledStars = 0
	let cntEmptyStars = 0
	let isHalfStar = false
	if (Number.isInteger(starRating)) {
		cntFilledStars = starRating
		cntEmptyStars = 5 - starRating
	} else {
		cntFilledStars = Math.floor(starRating)
		isHalfStar = (starRating - cntFilledStars) * 10 >= 5
		cntEmptyStars = isHalfStar ? 4 - cntFilledStars : 5 - cntFilledStars
	}
	return (
		<div className="flex gap-[5px]">
			{Array.from({ length: cntFilledStars }, (_, idx) => (
				<NTIcon
					key={idx}
					icon="starFull"
					className="aspect-square w-[16px] text-PY100"
				/>
			))}
			{isHalfStar && <HalfStar />}
			{Array.from({ length: cntEmptyStars }, (_, idx) => (
				<NTIcon
					key={idx}
					icon="starFull"
					className="aspect-square w-[16px] text-White"
				/>
			))}
		</div>
	)
}
function ReviewNotice({ reviewCount }: { reviewCount: number }) {
	const { reviewRef, scrollToSection, setFocusedSection } = useScroll()
	return (
		<div
			className="flex items-center hover:cursor-pointer hover:drop-shadow-lg"
			onClick={() => {
				scrollToSection(reviewRef)
				setFocusedSection("리뷰")
			}}
		>
			<p className="text-Body02 font-Regular text-Gray10">
				{reviewCount} 개의 리뷰
			</p>
			<NTIcon
				icon="expandRight"
				className="aspect-square w-[20px] text-Gray10"
			/>
		</div>
	)
}

function BannerDescription() {
	return (
		<div className="absolute left-64 top-[21rem] flex flex-col gap-4">
			<div className="flex gap-3">
				<p className="text-Body01 text-[18px] font-SemiBold text-White">
					#네일맛집 #주차가능 #오마카세아트
				</p>
			</div>
			<p className="line-clamp-3 w-[500px] whitespace-pre-wrap text-Body01 text-[18px] font-Regular text-Gray10">
				✨ 매달 네일 오마카세를 제공하는 디자인 맛집 모비네일 {`\n`}
				🔛 현재 당일 예약 가능합니다.
			</p>
		</div>
	)
}

function HalfStar() {
	return (
		<div className="flex w-fit">
			<div className="flex w-[8px] gap-0 overflow-hidden">
				<NTIcon className="m-0 w-[16px] p-0 text-PY100" icon="starHalf" />
			</div>
			<div className="flex w-[8px] scale-x-[-1] gap-0 overflow-hidden">
				<NTIcon className="m-0 w-[16px] p-0 text-White" icon="starHalf" />
			</div>
		</div>
	)
}
