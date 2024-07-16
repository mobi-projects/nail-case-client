"use client"

import { useRouter } from "next/navigation"
import type { Dispatch, SetStateAction } from "react"
import { useRef, useState } from "react"

import { NTButton } from "@/component/common/atom/nt-button"
import CustomerNaviBar from "@/component/custom/customer/shop/03"
import ShopInfoCardList from "@/component/custom/customer/shop/04"
import PostCardList from "@/component/custom/customer/shop/05/01"
import ShopDesignList from "@/component/custom/customer/shop/05/02"
import ShopNewsList from "@/component/custom/customer/shop/05/03"
import ShopReviewList from "@/component/custom/customer/shop/05/04"
import { getNowStamp } from "@/util/common"

export default function CustomerShopContent({ shopId }: { shopId: number }) {
	const shopInfoRef = useRef<HTMLDivElement>(null)
	const designRef = useRef<HTMLDivElement>(null)
	const newsRef = useRef<HTMLDivElement>(null)
	const reviewRef = useRef<HTMLDivElement>(null)

	const handleScroll = (ref: React.RefObject<HTMLDivElement>) => {
		const offset = 40
		if (ref.current) {
			const topPosition =
				ref.current.getBoundingClientRect().top + window.pageYOffset - offset
			window.scrollTo({ top: topPosition, behavior: "smooth" })
		}
	}

	return (
		<div className="flex w-full flex-col">
			<CustomerNaviBar
				toolList={["홈", "디자인", "소식", "리뷰"]}
				className="w-[1200px] border-b-[2px] px-[400px]"
				onToolClick={(tool) => {
					if (tool === "홈") return handleScroll(shopInfoRef)
					if (tool === "디자인") return handleScroll(designRef)
					if (tool === "소식") return handleScroll(newsRef)
					if (tool === "리뷰") return handleScroll(reviewRef)
				}}
			/>
			<div
				ref={shopInfoRef}
				className="flex w-full flex-col gap-[20px] pt-[32px]"
			>
				<ShopInfoCardList />
				<ReservationBox shopId={shopId} />
				<p className="text-Title02">네일샵 공지</p>
				<PostCardList />
			</div>
			<div ref={designRef} className="pt-[32px]">
				<ShopDesignList />
			</div>
			<div ref={newsRef} className="pt-[32px]">
				<ShopNewsList />
			</div>
			<div ref={reviewRef} className="pt-[32px]">
				<ShopReviewList />
			</div>
		</div>
	)
}

function ReservationBox({ shopId }: { shopId: number }) {
	const [clickedStamp, setClickedStamp] = useState(getNowStamp())

	return <ReservationButton {...{ clickedStamp, setClickedStamp, shopId }} />
}
type ReservationScheduleSubComponentPT = {
	clickedStamp: number
	setClickedStamp: Dispatch<SetStateAction<number>>
	shopId: number
}

function ReservationButton({ shopId }: ReservationScheduleSubComponentPT) {
	const router = useRouter()
	return (
		<NTButton
			variant="tertiary"
			flexible="full"
			size="small"
			onClick={() => {
				router.push(`/shop/${shopId}/reservation`)
			}}
		>
			예약하기
		</NTButton>
	)
}
