import { useQuery } from "@tanstack/react-query"
import React, { useState } from "react"

import { NTButton } from "@/component/common/atom/nt-button"
import NTModal, {
	ModalContent,
	ModalHeader,
	ModalBody,
	ModalFooter,
} from "@/component/common/nt-modal"
import { QUERY_ANNOUNCEMENT_ARR } from "@/constant"
import { getShopAnnouncement } from "@/util/api/shop-controller"
import {
	getMonthFromStamp,
	getYearFromStamp,
	padStartToPrinting,
} from "@/util/common"
import { isUndefined } from "@/util/common/type-guard"

import { ErrorComponent, NotFountComponent, PendingComponent } from ".."

export type TComment = {
	postCommentId: number
	body: string
	createdAt: number
	createdBy: number
	timestampsFromLocalDateTime: string
}

export type TShopNewsItem = {
	imageIds: number[]
	memberId: number
	shopId: number
	postId: number
	title: string
	category: "NEWS" | "NOTICE"
	contents: string
	likes: number
	views: number
	liked: boolean
	commentCount: number | null
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

export default function ShopNoticeList({ shopId }: { shopId: number }) {
	const [selectedNotice, setSelectedNotice] = useState<TShopNewsItem | null>(
		null,
	)
	const [isModalOpen, setIsModalOpen] = useState(false)

	const {
		data: shopNotice,
		isError,
		isPending,
	} = useQuery({
		queryKey: [QUERY_ANNOUNCEMENT_ARR, shopId],
		queryFn: () => getShopAnnouncement(shopId),
	})

	if (isUndefined(shopNotice)) return <NotFountComponent />
	if (isError) return <ErrorComponent />
	if (isPending) return <PendingComponent />

	const shopNoticeList: TShopNewsItem[] = shopNotice.dataList.filter(
		(item: TShopNewsItem) => item.category === "NOTICE",
	)

	const handleNoticeClick = (notice: TShopNewsItem) => {
		setSelectedNotice(notice)
		setIsModalOpen(true)
	}

	const handleCloseModal = () => {
		setIsModalOpen(false)
		setSelectedNotice(null)
	}

	return (
		<div className="w-full">
			{shopNoticeList.map((item, idx) => (
				<div
					key={idx}
					className="mb-[20px] h-[160px] w-full cursor-pointer rounded-[26px] px-[25px] py-[20px] shadow-customGray60 transition-all hover:scale-105"
					onClick={() => handleNoticeClick(item)}
				>
					<div className="flex">
						<div className="mr-[20px] h-[120px] w-[233.6px] rounded-[6px] bg-Gray40"></div>
						<div className="grid h-full w-full grid-rows-[28px_63px_20px] gap-[4px]">
							<p className="text-nowrap text-Body01 text-PB100">
								{formatTimeStamp(item.createdAt)}
							</p>
							<p className="text-overflow-2 line-clamp-2 h-[63px] w-full overflow-hidden text-wrap break-keep text-Body01 leading-8 text-Gray80">
								{item.contents}
							</p>
							<div className="flex w-full gap-[4px] text-Callout text-Gray30">
								<p>좋아요 {item.likes}</p>
								<p>•</p>
								<p>댓글 {item.commentCount === null ? 0 : item.commentCount}</p>
							</div>
						</div>
					</div>
				</div>
			))}
			{isModalOpen && selectedNotice && (
				<NTModal size="large">
					<ModalContent>
						<ModalHeader>
							<h2 className="font-bold mb-4 text-2xl">
								{selectedNotice.title}
							</h2>
						</ModalHeader>
						<ModalBody>
							<p className="mb-[16px] text-sm">
								{formatTimeStamp(selectedNotice.createdAt)}
							</p>
							<p className="mb-[16px]">{selectedNotice.contents}</p>
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
