"use client"

import NTBannerImageCarousel from "@/component/common/nt-banner-image-carousel"
import NTContent from "@/component/common/nt-content"
import { useShopById, useShopReviews } from "@/hook/use-shop-controller"
import type { TNailShopInfo } from "@/type"
import { isUndefined } from "@/util/common/type-guard"

import { BannerButtonList } from "./banner-button-list/indext"
import { BannerTitle } from "./banner-tilte"

export default function CustomerShopBanner({ shopId }: { shopId: number }) {
	const {
		data: shopInfo,
		isError: isErrorShopInfo,
		isPending: isPendingShopInfo,
	} = useShopById(shopId!)
	const {
		data: shopReviews,
		isError: isErrorShopReviews,
		isPending: isPendingShopReviews,
	} = useShopReviews(shopId!)

	if (isErrorShopInfo || isErrorShopReviews) return <Error />
	if (isPendingShopInfo || isPendingShopReviews) return <Pending />
	if (isUndefined(shopInfo) || isUndefined(shopReviews)) return <NotFound />

	const nailShopInfo: TNailShopInfo = shopInfo.data

	console.log(nailShopInfo)

	return (
		<div className="flex h-[30rem] w-full justify-center px-[75px] pt-20">
			<NTBannerImageCarousel className="absolute left-0 top-0 z-[-10] h-[30rem] w-full" />
			<BannerButtonList />
			<NTContent mode="dark" className="absolute right-64 top-40">
				0/0
			</NTContent>
			<BannerTitle nailShopInfo={nailShopInfo} />
		</div>
	)
}

function NotFound() {
	return (
		<div className="flex h-[480px] w-full items-center justify-center">
			<div className="mt-[50px] flex h-[100px] flex-col items-center justify-center text-Headline02 text-PB100">
				데이터가 존재하지 않습니다.
				<p className="py-[50px] text-Gray70">잠시 후 다시 시도해주세요.</p>
			</div>
		</div>
	)
}

function Error() {
	return (
		<div className="flex h-[480px] w-full items-center justify-center">
			<div className="mt-[50px] flex h-[100px] flex-col items-center justify-center text-Headline02 text-PB100">
				데이터를 불러오는 중에 오류가 발생했습니다.
				<p className="py-[50px] text-Gray70">잠시 후 다시 시도해주세요.</p>
			</div>
		</div>
	)
}

function Pending() {
	return (
		<div className="flex h-[480px] w-full items-center justify-center">
			<div className="mt-[50px] flex h-[100px] flex-col items-center justify-center text-Headline02 text-PB100">
				데이터를 불러오는 중입니다.
				<p className="py-[50px] text-Gray70">잠시만 기다려 주세요.</p>
			</div>
		</div>
	)
}
