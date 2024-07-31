"use client"

import { useState } from "react"

import NTBannerImageCarousel from "@/component/common/nt-banner-image-carousel"
import { useShopInfo } from "@/hook/use-shop-controller"
import type { TResGetShopInfo } from "@/util/api_v2/get-shop-Info"

import NTContent from "../../../../../../common/nt-content/index"

import { BannerTitle } from "./banner-title"
import { getEssestialImageProps } from "./util"

export default function ManagerBanner() {
	const [selectedIdx, setSelectedIdx] = useState(0)

	const { data, isLoading } = useShopInfo(1)
	if (isLoading) {
		return <div>...Loding</div>
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
				className="absolute left-0 h-full w-full bg-transparent"
				accessSelected={getSelectedIdx}
				essentialImagePropArr={imageArray}
			/>
			<NTContent mode="dark" className="absolute left-[90px] top-10">
				미리보기
			</NTContent>
			<NTContent mode="dark" className="absolute left-[205px] top-10">
				{`${selectedIdx + 1}/${profileImageLength.toString()}`}
			</NTContent>
			<BannerTitle InfoData={InfoData} />
		</div>
	)
}