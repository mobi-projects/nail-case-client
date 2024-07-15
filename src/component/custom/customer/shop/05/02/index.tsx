import { useQuery } from "@tanstack/react-query"
import React, { useState } from "react"

import NTIcon from "@/component/common/nt-icon"
import { axiosInstance } from "@/config/axios"
import { isUndefined } from "@/util/common/type-guard"

import MonthlyArtModal from "./monthly-art-modal"

type TComment = {
	monthlyCommentId: number
	body: string
	createdAt: number
	createdBy: number
	timestampsFromLocalDateTime: string
}

export type TMonthlyArtItem = {
	imageIds: number[]
	memberId: number
	shopId: number
	monthlyArtId: number
	title: string
	contents: string
	likes: number
	views: number
	liked: boolean
	commentCount: number
	createdAt: number
	imageUrls: string[]
	comments: TComment[]
}

export default function ShopDesignList({ shopId }: { shopId: number }) {
	const [selectedArt, setSelectedArt] = useState<TMonthlyArtItem | null>(null)
	const [isModalOpen, setIsModalOpen] = useState(false)

	const fetchMonthlyArt = async (shopId: number) => {
		const response = await axiosInstance().get(`/shops/${shopId}/monthly-art`)
		return response.data
	}

	const { data: monthlyArt, isError } = useQuery({
		queryKey: ["monthlyArt", shopId],
		queryFn: () => fetchMonthlyArt(shopId),
	})

	if (isUndefined(monthlyArt))
		return (
			<div className="w-full">
				<p className="font-bold mb-6 text-2xl text-Title02">디자인</p>
				<div className="mt-[50px] flex h-[100px] flex-col items-center justify-center text-Headline02 text-PB100">
					데이터가 존재하지 않습니다.
					<p className="py-[50px] text-Gray70">잠시 후 다시 시도해주세요.</p>
				</div>
			</div>
		)

	if (isError) {
		return (
			<div className="w-full">
				<p className="font-bold mb-6 text-2xl text-Title02">디자인</p>
				<div className="mt-[50px] flex h-[100px] flex-col items-center justify-center text-Headline02 text-PB100">
					데이터를 불러오는 중에 오류가 발생했습니다.
					<p className="py-[50px] text-Gray70">잠시 후 다시 시도해주세요.</p>
				</div>
			</div>
		)
	}

	const monthlyArtList: TMonthlyArtItem[] = monthlyArt.dataList

	const handleArtClick = (art: TMonthlyArtItem) => {
		setSelectedArt(art)
		setIsModalOpen(true)
	}

	const handleCloseModal = () => {
		setIsModalOpen(false)
		setSelectedArt(null)
	}

	return (
		<div className="flex w-full flex-col">
			<p className="font-bold mb-6 text-2xl text-Title02">디자인</p>
			<div className="mt-[15px] grid grid-cols-3 gap-6">
				{monthlyArtList.map((item: TMonthlyArtItem, idx: number) => (
					<div
						key={idx}
						className="relative flex h-[264px] flex-col justify-center rounded-[26px] bg-Gray40 p-[16px] text-white"
					>
						<h3 className="font-semibold text-Headline01 text-PY80">
							{item.title}
						</h3>
						<p className="mt-[8px] text-Body01">{item.contents}</p>
						<div className="mt-[40px] flex cursor-pointer items-center">
							<p className="text-Body01" onClick={() => handleArtClick(item)}>
								자세히 보기
							</p>
							<NTIcon icon={"expandRightLight"} className="w-[24px]" />
						</div>
					</div>
				))}
			</div>
			<MonthlyArtModal
				isOpen={isModalOpen}
				art={selectedArt}
				onClose={handleCloseModal}
			/>
		</div>
	)
}
