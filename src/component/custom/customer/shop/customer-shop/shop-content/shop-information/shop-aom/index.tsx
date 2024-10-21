import Image from "next/image"
import { useState } from "react"

import { useGetMonthlyArtList } from "@/hook/use-aom"
import { isUndefined } from "@/util/common/type-guard"

import AOMError from "./aom-error"
import AOMFewItems from "./aom-few-items"
import AOMNodata from "./aom-nodata"
import AOMSkelton from "./aom-skelton"
import NavigationButton from "./navigation-button"

type ShopAOMPT = { shopId: number }
export default function ShopAom({ shopId }: ShopAOMPT) {
	const [focusedIdx, setFocusedIdx] = useState(0)
	const { data: AOMData, isLoading, isError } = useGetMonthlyArtList(shopId)

	if (isLoading) return <AOMSkelton />
	if (isError || isUndefined(AOMData)) return <AOMError />
	const AomDataList = AOMData.dataList
	const handleNext = () => {
		if (focusedIdx < AomDataList.length - 3) {
			setFocusedIdx(focusedIdx + 1)
		}
	}

	const handlePrevious = () => {
		if (focusedIdx > 0) {
			setFocusedIdx(focusedIdx - 1)
		}
	}
	if (AomDataList.length === 0) {
		return <AOMNodata />
	}

	return (
		<div className="relative mx-2 mb-10 h-[26rem] w-full gap-4 overflow-x-hidden md:h-[12rem] lg:h-[16rem] xl:h-[18rem] max-sm:h-[8rem]">
			<div
				className="absolute flex translate-x-[25rem] transform gap-4 transition-transform duration-700 ease-in-out"
				style={{ transform: `translateX(-${focusedIdx * 20}%)` }}
			>
				{AomDataList.map((data, idx) => (
					<div
						key={idx}
						className="relative h-[26rem] w-[24rem] flex-shrink-0 rounded-3xl px-2 text-Gray70 shadow-customGray80 md:h-[12rem] md:w-[12rem] lg:h-[16rem] lg:w-[16rem] xl:h-[18rem] xl:w-[18rem] max-sm:h-[8rem] max-sm:w-[8rem]"
					>
						<Image
							src={data.imageUrl}
							alt="이달의 아트"
							fill
							priority
							sizes="60vh"
							className="rounded-3xl"
						/>
					</div>
				))}

				{AomDataList.length <= 2 && <AOMFewItems />}
			</div>
			<NavigationButton
				onclick={handlePrevious}
				direction="left"
				isVisible={focusedIdx > 0}
			/>
			<NavigationButton
				onclick={handleNext}
				direction="right"
				isVisible={focusedIdx < AomDataList.length - 3}
			/>
		</div>
	)
}
