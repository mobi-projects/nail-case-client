"use client"
import NTBannerImageCarousel from "@/component/common/nt-banner-image-carousel"
import NTContent from "@/component/common/nt-content"

export default function ManagerBaseHomeBanner() {
	return (
		<div className="relative h-[380px] w-full">
			<NTBannerImageCarousel className="absolute left-0 h-full w-full bg-transparent" />
			<BannerHeader />
			<BannerDescription />
			<NTContent mode="dark" className="absolute right-[78px] top-[62px]">
				0/0
			</NTContent>
		</div>
	)
}
function BannerHeader() {
	return (
		<div className="absolute left-[6%] top-[52.5px]">
			<p className="text-Callout text-[14px] font-Light text-White">
				네일아트 전문 | 서울시 용산구
			</p>
			<h1 className="pt-[5.5px] text-Title01 text-[28px] font-Bold text-White">
				모비네일 한남
			</h1>
			<p className="pt-[3px] text-Callout font-SemiBold text-Gray20">
				오늘 340 · 전체 3,455,666
			</p>
		</div>
	)
}

function BannerDescription() {
	return (
		<div className="absolute left-[64px] top-[239px] z-10 flex flex-col gap-4">
			<div className="flex gap-[13px]">
				<p className="text-Body01 text-[18px] font-SemiBold text-White">
					#네일맛집 #주차가능 #오마카세아트
				</p>
			</div>
			<p className="line-clamp-3 w-[500px] whitespace-pre-wrap text-Body01 text-[18px] font-Regular text-White">
				✨ 매달 네일 오마카세를 제공하는 디자인 맛집 모비네일 {`\n`}
				🔛 현재 당일 예약 가능합니다.
			</p>
		</div>
	)
}
