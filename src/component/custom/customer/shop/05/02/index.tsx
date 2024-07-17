import { useQuery } from "@tanstack/react-query"
import React, { useState } from "react"

import { NTButton } from "@/component/common/atom/nt-button"
import NTIcon from "@/component/common/nt-icon"
import NTModal, {
	ModalContent,
	ModalHeader,
	ModalBody,
	ModalFooter,
} from "@/component/common/nt-modal"
import { QUERY_MONTHLY_ART_ARR } from "@/constant"
import { getShopMonthlyArt } from "@/util/api/shop-controller"
import {
	getMonthFromStamp,
	getYearFromStamp,
	padStartToPrinting,
} from "@/util/common"
import { isUndefined } from "@/util/common/type-guard"

import { ErrorComponent, NotFountComponent, PendingComponent } from ".."

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

const formatTimeStamp = (createAt: number) => {
	const year = getYearFromStamp(createAt)
	const month = getMonthFromStamp(createAt)
	const date = getMonthFromStamp(createAt)
	return `${padStartToPrinting("year", year)}.${padStartToPrinting("month", month)}.${padStartToPrinting("date", date)}`
}

export default function ShopDesignList({ shopId }: { shopId: number }) {
	const [selectedArt, setSelectedArt] = useState<TMonthlyArtItem | null>(null)
	const [isModalOpen, setIsModalOpen] = useState(false)

	const {
		data: monthlyArt,
		isError,
		isPending,
	} = useQuery({
		queryKey: [QUERY_MONTHLY_ART_ARR, shopId],
		queryFn: () => getShopMonthlyArt(shopId),
	})

	if (isUndefined(monthlyArt)) return <NotFountComponent />
	if (isError) return <ErrorComponent />
	if (isPending) return <PendingComponent />

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
			{isModalOpen && selectedArt && (
				<NTModal size="large">
					<ModalContent>
						<ModalHeader>
							<h2 className="font-bold mb-4 text-2xl">{selectedArt.title}</h2>
						</ModalHeader>
						<ModalBody>
							<p className="mb-[16px] text-sm">
								{formatTimeStamp(selectedArt.createdAt)}
							</p>
							<p className="mb-[16px]">{selectedArt.contents}</p>
						</ModalBody>
						<ModalFooter>
							<NTButton onClick={handleCloseModal}>닫기</NTButton>
						</ModalFooter>
					</ModalContent>
				</NTModal>
			)}
		</div>
	)
}
