import Image from "next/image"
import { useState } from "react"

import NTIcon from "@/component/common/nt-icon"
import { useGetMonthlyArtList } from "@/hook/use-aom"
import { isUndefined } from "@/util/common/type-guard"

import AOMError from "./aom-error"
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
	return (
		<div className="relative flex h-[586px] w-full flex-col gap-8 px-2 pt-14">
			<div className="flex">
				<div className="text-Title01 text-PB80">이달의 아트</div>
				<NTIcon icon="art" className="text-Black" />
			</div>
			<hr />
			<div className="w-full gap-4 overflow-hidden">
				<div
					className="flex translate-x-[25rem] transform gap-4 transition-transform duration-700 ease-in-out"
					style={{ transform: `translateX(-${focusedIdx * 25}rem)` }}
				>
					{AomDataList.map((data, idx) => (
						<div
							key={idx}
							className="relative h-[26rem] w-[24rem] flex-shrink-0 rounded-3xl px-2 text-Gray70 shadow-customGray80"
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
				</div>
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
