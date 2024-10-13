"use client"

import { useState } from "react"

import { useShopById } from "@/hook/use-shop-controller"

import CustomerShopBanner from "../banner"
import CustomerToolbar from "../customer-toolbar"
import CustomerShopContent from "../shop-content"
import ShopError from "../shop-error"

type CustomerShopPagePT = {
	shopId: number
}
export function CustomerShopPage({ shopId }: CustomerShopPagePT) {
	const [focusedIdx, setFocusedIdx] = useState(0)
	const { data: shopData } = useShopById(shopId)
	if (!shopData) return <ShopError />

	const { shopName, address, profileImages } = shopData
	const handleContentChange = (idx: number) => {
		setFocusedIdx(idx)
	}
	return (
		<div className="h-full">
			<CustomerShopBanner
				shopName={shopName}
				shopAddress={address}
				profileImages={profileImages}
				shopId={shopId}
			/>
			<CustomerToolbar
				focusedIdx={focusedIdx}
				onContentChange={handleContentChange}
			/>
			<CustomerShopContent
				shopId={shopId}
				data={shopData}
				focusedIdx={focusedIdx}
			/>
		</div>
	)
}
