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
		<div className="relative mx-2 mb-10 h-[24rem] w-full overflow-x-hidden lg:h-[16rem] xl:h-[20rem] max-md:h-[10rem]">
			<div
				className="absolute flex translate-x-[25rem] transform gap-5 transition-transform duration-700 ease-in-out"
				style={{ transform: `translateX(-${focusedIdx * 25}rem)` }}
			>
				{AomDataList.map((data, idx) => (
					<div
						key={idx}
						className="relative h-[24rem] w-[24rem] flex-shrink-0 rounded-3xl px-3 text-Gray70 shadow-customGray80 md:h-[10rem] md:w-[13rem] lg:h-[16rem] lg:w-[29dvw] xl:h-[20rem] xl:w-[29dvw] max-sm:h-[10rem] max-sm:w-[10rem] max-md:px-5"
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
