import Image from "next/image"
import { useState } from "react"

import NTIcon from "@/component/common/nt-icon"
import { cn } from "@/config/tailwind"
import { useGetMonthlyArtList } from "@/hook/use-aom"
import { isUndefined } from "@/util/common/type-guard"

import AOMError from "./aom-error"
import AOMSkelton from "./aom-skelton"

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
		<div className="relative flex h-[586px] w-full px-2 pt-14">
			<div className="w-full gap-4 overflow-hidden">
				<div
					className="flex transform gap-4 transition-transform duration-700 ease-in-out"
					style={{ transform: `translateX(-${focusedIdx * 33.33}%)` }}
				>
					{AomDataList.map((data, idx) => (
						<div
							key={idx}
							className="relative h-[26rem] w-[32.33%] flex-shrink-0 rounded-3xl px-2 text-Gray70 shadow-customGray80"
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
			<div
				className={cn(
					"absolute left-2 top-56 cursor-pointer rounded-xl bg-Gray10",
					focusedIdx > 0 ? "opacity-30 hover:opacity-100" : "opacity-0",
				)}
			>
				<NTIcon
					onClick={handlePrevious}
					className="h-14 w-14 transition disabled:opacity-50"
					icon="expandLeftLight"
				></NTIcon>
			</div>
			<div
				className={cn(
					"absolute right-2 top-56 cursor-pointer rounded-xl bg-Gray10",
					focusedIdx < AomDataList.length - 3
						? "opacity-30 hover:opacity-100"
						: "opacity-0",
				)}
			>
				<NTIcon
					onClick={handleNext}
					className="h-14 w-14 transition disabled:opacity-50"
					icon="expandRightLight"
				>
					다음
				</NTIcon>
			</div>
		</div>
	)
}
