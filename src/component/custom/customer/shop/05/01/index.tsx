import { useQuery } from "@tanstack/react-query"
import React, { useState } from "react"

import { QUERY_ANNOUNCEMENT_ARR } from "@/constant"
import { getShopAnnouncement } from "@/util/api/shop-controller"
import {
	getMonthFromStamp,
	getYearFromStamp,
	padStartToPrinting,
} from "@/util/common"
import { isUndefined } from "@/util/common/type-guard"

import ShopNoticeModal from "./notice-modal"

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
	commentCount: number
	createdAt: number
	imageUrls: string[]
	comments: TComment[]
}

export default function ShopNoticeList({ shopId }: { shopId: number }) {
	const [selectedNotice, setSelectedNotice] = useState<TShopNewsItem | null>(
		null,
	)
	const [isModalOpen, setIsModalOpen] = useState(false)

	const { data: shopNotice, isError } = useQuery({
		queryKey: [QUERY_ANNOUNCEMENT_ARR, shopId],
		queryFn: () => getShopAnnouncement(shopId),
	})

	if (isUndefined(shopNotice))
		return (
			<div className="w-full">
				<div className="mt-[50px] flex h-[100px] flex-col items-center justify-center text-Headline02 text-PB100">
					데이터가 존재하지 않습니다.
					<p className="py-[50px] text-Gray70">잠시 후 다시 시도해주세요.</p>
				</div>
			</div>
		)

	if (isError) {
		return (
			<div className="w-full">
				<div className="mt-[50px] flex h-[100px] flex-col items-center justify-center text-Headline02 text-PB100">
					데이터를 불러오는 중에 오류가 발생했습니다.
					<p className="py-[50px] text-Gray70">잠시 후 다시 시도해주세요.</p>
				</div>
			</div>
		)
	}

	const shopNoticeList: TShopNewsItem[] = shopNotice.dataList.filter(
		(item: TShopNewsItem) => item.category === "NOTICE",
	)

	const formatTimeStamp = (createAt: number) => {
		const year = getYearFromStamp(createAt)
		const month = getMonthFromStamp(createAt)
		const date = getMonthFromStamp(createAt)
		return `${padStartToPrinting("year", year)}.${padStartToPrinting("month", month)}.${padStartToPrinting("date", date)}`
	}

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
			<ShopNoticeModal
				isOpen={isModalOpen}
				notice={selectedNotice}
				onClose={handleCloseModal}
			/>
		</div>
	)
}
