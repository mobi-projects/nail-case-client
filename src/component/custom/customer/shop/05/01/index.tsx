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

export default function ShopNoticeList({ shopId }: { shopId: number }) {
	const fetchShopNotice = async (shopId: number) => {
		const response = await axiosInstance().get(`/shops/${shopId}/announcements`)
		return response.data
	}

	const { data: shopNotice } = useQuery({
		queryKey: ["shopNews", shopId],
		queryFn: () => fetchShopNotice(shopId),
	})

	if (isUndefined(shopNotice)) return <h1>데이터 없음</h1>

	const shopNoticeList: ShopNewsItem[] = shopNotice.dataList.filter(
		(item: ShopNewsItem) => item.category === "NOTICE",
	)

	const formatTimeStamp = (createAt: number) => {
		const year = getYearFromStamp(createAt!)
		const month = getMonthFromStamp(createAt!)
		const date = getMonthFromStamp(createAt!)
		return `${padStartToPrinting("year", year)}.${padStartToPrinting("month", month)}.${padStartToPrinting("date", date)}`
	}

	console.log(shopNoticeList)

	return (
		<div className="w-full">
			{shopNoticeList.map((item, idx) => (
				<div
					key={idx}
					className="mb-[20px] h-[160px] w-full cursor-pointer rounded-[26px] px-[25px] py-[20px] shadow-customGray60 transition-all hover:scale-105"
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
		</div>
	)
}
