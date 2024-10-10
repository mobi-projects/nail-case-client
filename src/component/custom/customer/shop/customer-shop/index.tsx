"use client"

import { useRef } from "react"

import { useShopById } from "@/hook/use-shop-controller"

import CustomerShopBanner from "../banner"
import CustomerToolbar from "../customer-toolbar"
import CustomerShopContent from "../shop-content"
import ShopError from "../shop-error"

type CustomerShopPagePT = {
	shopId: number
}
export function CustomerShopPage({ shopId }: CustomerShopPagePT) {
	const homeRef = useRef<HTMLDivElement>(null)
	const aomRef = useRef<HTMLDivElement>(null)
	const { data: shopData } = useShopById(shopId)
	if (!shopData) return <ShopError />

	const { shopName, address, profileImages } = shopData

	const scrollToHome = () => {
		homeRef.current?.scrollIntoView({ behavior: "smooth" })
	}

	const scrollToAom = () => {
		aomRef.current?.scrollIntoView({ behavior: "smooth" })
	}
	return (
		<div className="h-full">
			<CustomerShopBanner
				shopName={shopName}
				shopAddress={address}
				profileImages={profileImages}
				shopId={shopId}
			/>
			<CustomerToolbar scrollToHome={scrollToHome} scrollToAom={scrollToAom} />
			<CustomerShopContent
				shopId={shopId}
				data={shopData}
				homeRef={homeRef}
				aomRef={aomRef}
			/>
		</div>
	)
}
