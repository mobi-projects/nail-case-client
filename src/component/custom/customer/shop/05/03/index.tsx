import { useQuery } from "@tanstack/react-query"

import { axiosInstance } from "@/config/axios"
import {
	getMonthFromStamp,
	getYearFromStamp,
	padStartToPrinting,
} from "@/util/common"
import { isUndefined } from "@/util/common/type-guard"

type Comment = {
	postCommentId: number
	body: string
	createdAt: number
	createdBy: number
	timestampsFromLocalDateTime: string
}

type ShopNewsItem = {
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
	comments: Comment[]
}

export default function ShopNewsList({ shopId }: { shopId: number }) {
	const fetchShopNews = async (shopId: number) => {
		const response = await axiosInstance().get(`/shops/${shopId}/announcements`)
		return response.data
	}

	const { data: shopNews } = useQuery({
		queryKey: ["shopNews", shopId],
		queryFn: () => fetchShopNews(shopId),
	})

	if (isUndefined(shopNews)) return <h1>데이터 없음</h1>

	const shopNewsList: ShopNewsItem[] = shopNews.dataList.filter(
		(item: ShopNewsItem) => item.category === "NEWS",
	)

	const formatTimeStamp = (createAt: number) => {
		const year = getYearFromStamp(createAt!)
		const month = getMonthFromStamp(createAt!)
		const date = getMonthFromStamp(createAt!)
		return `${padStartToPrinting("year", year)}.${padStartToPrinting("month", month)}.${padStartToPrinting("date", date)}`
	}

	return (
		<div className="w-full">
			<p className="font-bold mb-6 text-2xl text-Title02">소식</p>
			<div className="mt-[15px] grid grid-cols-3 gap-[15px]">
				{shopNewsList.map((item, idx) => (
					<div
						key={idx}
						className="flex h-[384px] w-[384px] cursor-pointer flex-col rounded-[26px] bg-gradient-to-b from-transparent to-Gray50 p-[20px]"
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
		</div>
	)
}
