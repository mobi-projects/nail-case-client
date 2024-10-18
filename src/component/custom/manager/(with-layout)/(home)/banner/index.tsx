"use client"

import { useState } from "react"

import NTBannerImageCarousel from "@/component/common/nt-banner-image-carousel"
import NTContent from "@/component/common/nt-content"
import { useShopById } from "@/hook/use-shop-controller"
import type { TResGetShopInfo } from "@/util/api/get-shop-info"

import { BannerTitle } from "./banner-title"
import { getEssestialImageProps } from "./banner.util"

type ManagerBannerPT = { shopId: number }
export default function ManagerBanner({ shopId }: ManagerBannerPT) {
	const [selectedIdx, setSelectedIdx] = useState(0)

	const { data, isLoading } = useShopById(shopId)
	if (isLoading) {
		return (
			<div className="relative h-[432.47px] w-full animate-pulse rounded-xl bg-Gray20 transition-all" />
		)
	}
	const InfoData = data as TResGetShopInfo
	const getSelectedIdx = (idx: number) => {
		setSelectedIdx(idx)
	}
	const profileImageLength = InfoData.profileImages.length
	const imageArray = getEssestialImageProps(InfoData.profileImages)
	return (
		<div className="relative h-[432.47px] w-full">
			<NTBannerImageCarousel
				className="absolute left-0 h-full w-full rounded-xl bg-transparent"
				accessSelected={getSelectedIdx}
				essentialImagePropArr={imageArray}
			/>
			<NTContent mode="dark" className="absolute left-[90px] top-10">
				미리보기
			</NTContent>
			<NTContent
				mode="dark"
				className="absolute left-[205px] top-10 min-w-[5rem]"
			>
				{`${selectedIdx + 1}/${profileImageLength.toString()}`}
			</NTContent>
			<BannerTitle infoData={InfoData} />
		</div>
	)
}
