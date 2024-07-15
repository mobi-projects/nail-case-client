import { useQuery } from "@tanstack/react-query"
import React, { useState } from "react"

import { axiosInstance } from "@/config/axios"
import {
	getMonthFromStamp,
	getYearFromStamp,
	padStartToPrinting,
} from "@/util/common"
import { isUndefined } from "@/util/common/type-guard"

import ShopNewsModal from "./news-modal"

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

export default function ShopNewsList({ shopId }: { shopId: number }) {
	const [selectedNews, setSelectedNews] = useState<TShopNewsItem | null>(null)
	const [isModalOpen, setIsModalOpen] = useState(false)

	const fetchShopNews = async (shopId: number) => {
		const response = await axiosInstance().get(`/shops/${shopId}/announcements`)
		return response.data
	}

	const { data: shopNews, isError } = useQuery({
		queryKey: ["shopNews", shopId],
		queryFn: () => fetchShopNews(shopId),
	})

	if (isUndefined(shopNews))
		return (
			<div className="w-full">
				<p className="font-bold mb-6 text-2xl text-Title02">소식</p>
				<div className="mt-[50px] flex h-[100px] flex-col items-center justify-center text-Headline02 text-PB100">
					데이터가 존재하지 않습니다.
					<p className="py-[50px] text-Gray70">잠시 후 다시 시도해주세요.</p>
				</div>
			</div>
		)

	if (isError) {
		return (
			<div className="w-full">
				<p className="font-bold mb-6 text-2xl text-Title02">소식</p>
				<div className="mt-[50px] flex h-[100px] flex-col items-center justify-center text-Headline02 text-PB100">
					데이터를 불러오는 중에 오류가 발생했습니다.
					<p className="py-[50px] text-Gray70">잠시 후 다시 시도해주세요.</p>
				</div>
			</div>
		)
	}

	const shopNewsList: TShopNewsItem[] = shopNews.dataList.filter(
		(item: TShopNewsItem) => item.category === "NEWS",
	)

	const formatTimeStamp = (createAt: number) => {
		const year = getYearFromStamp(createAt)
		const month = getMonthFromStamp(createAt)
		const date = getMonthFromStamp(createAt)
		return `${padStartToPrinting("year", year)}.${padStartToPrinting("month", month)}.${padStartToPrinting("date", date)}`
	}

	const handleNewsClick = (news: TShopNewsItem) => {
		setSelectedNews(news)
		setIsModalOpen(true)
	}

	const handleCloseModal = () => {
		setIsModalOpen(false)
		setSelectedNews(null)
	}

	return (
		<div className="w-full">
			<p className="font-bold mb-6 text-2xl text-Title02">소식</p>
			<div className="mt-[15px] grid grid-cols-3 gap-[15px]">
				{shopNewsList.map((item, idx) => (
					<div
						key={idx}
						className="flex h-[384px] w-[384px] cursor-pointer flex-col rounded-[26px] bg-gradient-to-b from-transparent to-Gray50 p-[20px]"
						onClick={() => handleNewsClick(item)}
					>
						<div className="flex-1 rounded-[26px]"></div>
						<div className="mt-[15px]">
							<p className="text-Headline02 text-White">
								{formatTimeStamp(item.createdAt)}
							</p>
							<p className="mt-[5px] text-Title03 text-White">{item.title}</p>
							<p className="mt-[5px] text-Body01 text-White">{item.contents}</p>
							<p className="mt-[10px] text-Callout text-White">
								좋아요 {item.likes} · 댓글
								{item.commentCount === null ? 0 : item.commentCount}
							</p>
						</div>
					</div>
				))}
			</div>
			<ShopNewsModal
				isOpen={isModalOpen}
				news={selectedNews}
				onClose={handleCloseModal}
			/>
		</div>
	)
}
