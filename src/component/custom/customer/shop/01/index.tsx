"use client"

import { useState } from "react"

import { NTButton } from "@/component/common/atom/nt-button"
import NTBannerImageCarousel from "@/component/common/nt-banner-image-carousel"
import NTContent from "@/component/common/nt-content"
import NTIcon from "@/component/common/nt-icon"
import { useShopInfo, useShopReviews } from "@/hook/use-shop-controller"
import type { TNailShopInfo } from "@/type"
import { isUndefined } from "@/util/common/type-guard"

export default function CustomerShopBanner({ shopId }: { shopId: number }) {
	const {
		data: shopInfo,
		isError: isErrorShopInfo,
		isPending: isPendingShopInfo,
	} = useShopInfo(shopId!)
	const {
		data: shopReviews,
		isError: isErrorShopReviews,
		isPending: isPendingShopReviews,
	} = useShopReviews(shopId!)

	if (isErrorShopInfo || isErrorShopReviews) return <Error />
	if (isPendingShopInfo || isPendingShopReviews) return <Pending />
	if (isUndefined(shopInfo) || isUndefined(shopReviews)) return <NotFound />

	const shopReviewListCount = shopReviews.dataList.length

	const nailShopInfo: TNailShopInfo = shopInfo.data

	console.log(nailShopInfo)

	return (
		<div className="flex h-[480px] w-full">
			<NTBannerImageCarousel className="absolute left-0 h-[480px] w-full" />
			<PageRoutingIconButtons />
			<ShareIconButtons />
			<NTContent mode="dark" className="absolute right-64 top-40">
				0/0
			</NTContent>
			<ShopBasic
				nailShopInfo={nailShopInfo}
				reviewCount={shopReviewListCount}
			/>
			<BannerDescription nailShopInfo={nailShopInfo} />
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
	const [isModalOpen, setIsModalOpen] = useState(false)

	const handleShareClick = () => {
		setIsModalOpen(true)
	}

	const handleCloseModal = () => {
		setIsModalOpen(false)
	}

	const handleCopyUrl = () => {
		navigator.clipboard.writeText(window.location.href).then(() => {
			alert("URL이 복사되었습니다.")
		})
	}

	return (
		<>
			<NTIcon
				className="absolute right-64 top-[78px] aspect-square w-7 text-White drop-shadow-[0_0_1px_rgba(0,0,0,0.9)] hover:cursor-pointer"
				icon="share"
				onClick={handleShareClick}
			/>
			{isModalOpen && (
				<div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
					<div className="w-[500px] rounded bg-white p-[16px] shadow-lg">
						<div className="mb-[15px] flex items-center justify-between">
							<p className="text-Headline02">공유하기</p>
							<NTIcon
								icon="closeRoundLight"
								onClick={handleCloseModal}
								className="cursor-pointer"
							/>
						</div>
						<div className="flex items-center">
							<input
								type="text"
								value={window.location.href}
								readOnly
								className="mr-[8px] h-[56px] w-full rounded-[12px] border p-[8px]"
							/>
							<NTButton onClick={handleCopyUrl}>복사</NTButton>
						</div>
					</div>
				</div>
			)}
		</>
	)
}

function ShopBasic({
	nailShopInfo,
	reviewCount,
}: {
	nailShopInfo: TNailShopInfo
	reviewCount: number
}) {
	const category = "네일아트 전문"
	const location = nailShopInfo.address
	const shopName = nailShopInfo.shopName
	const starRating = nailShopInfo.shopAvgRatings

	return (
		<div className="absolute left-64 top-40 h-fit w-fit">
			<div className="flex flex-col gap-[6px]">
				<p className="text-Callout font-Light text-White">
					{category} | {location}
				</p>
				<p className="text-Title01 font-Bold text-White">{shopName}</p>
			</div>
			<div className="flex items-center gap-4">
				<FiveStars starRating={starRating} />
				<p className="text-Body02 font-Bold text-White">{starRating}</p>
				<ReviewNotice reviewCount={reviewCount} />
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
	return (
		<div className="flex items-center hover:cursor-pointer hover:drop-shadow-lg">
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

function BannerDescription({ nailShopInfo }: { nailShopInfo: TNailShopInfo }) {
	const formattedTags = nailShopInfo.tags.map((tag) => `#${tag}`).join(" ")
	return (
		<div className="absolute left-64 top-[21rem] flex flex-col gap-4">
			<div className="flex gap-3">
				<p className="text-Body01 text-[18px] font-SemiBold text-White">
					{formattedTags}
				</p>
			</div>
			<p className="w-[500px] whitespace-pre-line text-Body01 text-[18px] font-Regular text-Gray10">
				{nailShopInfo.overview}
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
