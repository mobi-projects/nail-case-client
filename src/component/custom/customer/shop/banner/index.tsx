"use client"

import { useState } from "react"

import NTBannerImageCarousel from "@/component/common/nt-banner-image-carousel"
import NTContent from "@/component/common/nt-content"
import { getEssestialImageProps } from "@/component/custom/manager/(with-layout)/(home)/banner/banner.util"
import type { TShopImage } from "@/util/api-v2/get-shop-by-id"

import { BannerButtonList } from "./banner-button-list"
import { BannerTitle } from "./banner-tilte"

export type CustomerShopBannerTitlePT = {
	shopAddress: string
	shopName: string
	profileImages: Array<TShopImage>
}
export default function CustomerShopBanner({
	shopAddress,
	shopName,
	profileImages,
}: CustomerShopBannerTitlePT) {
	const [currentIndex, setCurrentIndex] = useState(0)
	const imageArray = getEssestialImageProps(profileImages)

	const handleImageSelect = (idx: number) => {
		setCurrentIndex(idx)
	}
	return (
		<div className="flex h-[22rem] w-full flex-col gap-20 px-20 pt-5">
			<NTBannerImageCarousel
				className="absolute left-0 top-0 h-[22rem] w-full bg-transparent"
				essentialImagePropArr={imageArray}
				accessSelected={handleImageSelect}
			/>
			<BannerButtonList />
			<div className="z-10 flex h-fit w-full justify-between">
				<BannerTitle shopAddress={shopAddress} shopName={shopName} />
				<NTContent mode="dark">
					{`${currentIndex + 1}/${profileImages.length.toString()}`}
				</NTContent>
			</div>
		</div>
	)
}
