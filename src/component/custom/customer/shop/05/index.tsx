"use client"

import { useRef } from "react"

import CustomerNaviBar from "@/component/custom/customer/shop/03"
import ShopInfoCardList from "@/component/custom/customer/shop/04"
import PostCardList from "@/component/custom/customer/shop/05/01"
import ShopDesignList from "@/component/custom/customer/shop/05/02"
import ShopNewsList from "@/component/custom/customer/shop/05/03"
import ShopReviewList from "@/component/custom/customer/shop/05/04"

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
			<div ref={shopInfoRef} className="flex w-full flex-col gap-[20px] pt-16">
				<ShopInfoCardList />
				<p className="text-Title02">네일샵 공지</p>
				<PostCardList shopId={shopId} />
			</div>
			<div ref={designRef} className="pt-[32px]">
				<p className="text-Title02">디자인</p>
				<ShopDesignList shopId={shopId} />
			</div>
			<div ref={newsRef} className="pt-[32px]">
				<p className="text-Title02">소식</p>
				<ShopNewsList shopId={shopId} />
			</div>
			<div ref={reviewRef} className="pt-[32px]">
				<p className="text-Title02">리뷰</p>
				<ShopReviewList shopId={shopId} />
			</div>
		</div>
	)
}

export function ErrorComponent() {
	return (
		<div className="w-full">
			<div className="mt-[50px] flex h-[100px] flex-col items-center justify-center text-Headline02 text-PB100">
				데이터를 불러오는 중에 오류가 발생했습니다.
				<p className="py-[50px] text-Gray70">잠시 후 다시 시도해주세요.</p>
			</div>
		</div>
	)
}

export function NotFountComponent() {
	return (
		<div className="w-full">
			<div className="mt-[50px] flex h-[100px] flex-col items-center justify-center text-Headline02 text-PB100">
				데이터가 존재하지 않습니다.
				<p className="py-[50px] text-Gray70">잠시 후 다시 시도해주세요.</p>
			</div>
		</div>
	)
}

export function PendingComponent() {
	return (
		<div className="h-full w-full">
			<div className="mt-[50px] flex h-[100px] flex-col items-center justify-center text-Headline02 text-PB100">
				데이터를 불러오는 중입니다.
				<p className="py-[50px] text-Gray70">잠시만 기다려 주세요.</p>
			</div>
		</div>
	)
}
