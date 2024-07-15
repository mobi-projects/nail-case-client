"use client"

import CustomerNaviBar from "@/component/custom/customer/shop/03"
import ShopInfoCardList from "@/component/custom/customer/shop/04"
import PostCardList from "@/component/custom/customer/shop/05/01"
import ShopDesignList from "@/component/custom/customer/shop/05/02"
import ShopNewsList from "@/component/custom/customer/shop/05/03"
import ShopReviewList from "@/component/custom/customer/shop/05/04"

import { useScroll } from "./scroll-context"

export default function CustomerShopContent() {
	const {
		shopInfoRef,
		designRef,
		newsRef,
		reviewRef,
		scrollToSection,
		setFocusedSection,
	} = useScroll()

	return (
		<div className="flex w-full flex-col">
			<CustomerNaviBar
				toolList={["홈", "디자인", "소식", "리뷰"]}
				className="w-[1200px] border-b-[2px] px-[400px]"
				onToolClick={(tool) => {
					setFocusedSection(tool)
					if (tool === "홈") return scrollToSection(shopInfoRef)
					if (tool === "디자인") return scrollToSection(designRef)
					if (tool === "소식") return scrollToSection(newsRef)
					if (tool === "리뷰") return scrollToSection(reviewRef)
				}}
			/>
			<div ref={shopInfoRef} className="flex w-full flex-col gap-[20px] pt-16">
				<ShopInfoCardList />
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
