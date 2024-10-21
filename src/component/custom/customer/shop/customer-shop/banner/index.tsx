"use client"
import { useState } from "react"

import NTBannerImageCarousel from "@/component/common/nt-banner-image-carousel"
import NTContent from "@/component/common/nt-content"
import { getEssestialImageProps } from "@/component/custom/manager/(with-layout)/(home)/banner/banner.util"
import type { TShopImage } from "@/util/api/get-shop-by-id"

import { BannerButtonList } from "./banner-button-list"
import { BannerTitle } from "./banner-tilte"

export type CustomerShopBannerTitlePT = {
	shopAddress: string
	shopName: string
	profileImages: Array<TShopImage>
	shopId: number
}
export default function CustomerShopBanner({
	shopAddress,
	shopName,
	profileImages,
	shopId,
}: CustomerShopBannerTitlePT) {
	const [currentIndex, setCurrentIndex] = useState(0)
	const imageArray = getEssestialImageProps(profileImages)

	const handleImageSelect = (idx: number) => {
		setCurrentIndex(idx)
	}
	return (
		<div className="relative flex h-[26rem] w-full flex-col gap-16 lg:h-[16rem] xl:h-[20rem] max-md:h-[14rem]">
			<NTBannerImageCarousel
				className="h-full w-full rounded-b-[40px] bg-transparent max-xl:rounded-b-[20px]"
				essentialImagePropArr={imageArray}
				accessSelected={handleImageSelect}
			/>
			<BannerButtonList shopId={shopId} />
			<div className="absolute top-1/4 flex h-fit w-full justify-between px-14 max-md:px-6">
				<BannerTitle shopAddress={shopAddress} shopName={shopName} />
				<NTContent
					mode="dark"
					className="min-w-[5rem] md:min-w-16 max-sm:min-w-14"
				>
					{`${currentIndex + 1}/${profileImages.length.toString()}`}
				</NTContent>
			</div>
		</div>
	)
}
