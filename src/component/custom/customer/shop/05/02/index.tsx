import { useQuery } from "@tanstack/react-query"

import NTIcon from "@/component/common/nt-icon"
import { axiosInstance } from "@/config/axios"
import { isUndefined } from "@/util/common/type-guard"

type Comment = {
	monthlyCommentId: number
	body: string
	createdAt: number
	createdBy: number
	timestampsFromLocalDateTime: string
}

type MonthlyArtItem = {
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
	comments: Comment[]
}

export default function ShopDesignList({ shopId }: { shopId: number }) {
	const fetchMonthlyArt = async (shopId: number) => {
		const response = await axiosInstance().get(`/shops/${shopId}/monthly-art`)
		return response.data
	}

	const { data: monthlyArt } = useQuery({
		queryKey: ["monthlyArt", shopId],
		queryFn: () => fetchMonthlyArt(shopId),
	})

	if (isUndefined(monthlyArt)) return <h1>데이터 없음</h1>

	const monthlyArtList: MonthlyArtItem[] = monthlyArt.dataList

	console.log(monthlyArtList)
	return (
		<div className="flex w-full flex-col">
			<p className="font-bold mb-6 text-2xl text-Title02">디자인</p>
			<div className="mt-[15px] grid grid-cols-3 gap-6">
				{monthlyArtList.map((item: MonthlyArtItem, idx: number) => (
					<div
						key={idx}
						className="relative flex h-[264px] flex-col justify-center rounded-[26px] bg-Gray40 p-[16px] text-white"
					>
						<h3 className="font-semibold text-Headline01 text-PY80">
							{item.title}
						</h3>
						<p className="mt-[8px] text-Body01">{item.contents}</p>
						<div className="mt-[40px] flex cursor-pointer items-center">
							<p className="text-Body01">자세히 보기</p>
							<NTIcon icon={"expandRightLight"} className="w-[24px]" />
						</div>
					</div>
				))}
			</div>
		</div>
	)
}
