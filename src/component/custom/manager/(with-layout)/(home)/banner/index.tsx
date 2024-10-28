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
			<div className="relative h-[432.47px] w-full animate-pulse rounded-xl bg-Gray20 transition-all lg:h-[16rem] xl:h-[20rem] max-md:h-[11rem] max-lg:rounded-none" />
		)
	}
	const InfoData = data as TResGetShopInfo
	const getSelectedIdx = (idx: number) => {
		setSelectedIdx(idx)
	}
	const profileImageLength = InfoData.profileImages.length
	const imageArray = getEssestialImageProps(InfoData.profileImages)
	return (
		<div className="relative h-[432.47px] w-full lg:h-[16rem] xl:h-[20rem] max-md:h-[11rem]">
			<NTBannerImageCarousel
				className="bg-transparen left-0 h-full w-full rounded-xl max-lg:rounded-none"
				accessSelected={getSelectedIdx}
				essentialImagePropArr={imageArray}
			/>
			<div className="absolute left-24 top-12 flex h-fit w-fit flex-col gap-y-2 lg:left-14 lg:top-8 max-md:left-6 max-md:top-5">
				<div className="flex items-center gap-x-4">
					<NTContent mode="dark" className="max-md:px-2">
						미리보기
					</NTContent>
					<NTContent
						mode="dark"
						className="min-w-[5rem] md:min-w-16 max-sm:min-w-14"
					>
						{`${selectedIdx + 1}/${profileImageLength.toString()}`}
					</NTContent>
				</div>
				<BannerTitle infoData={InfoData} />
			</div>
		</div>
	)
}
