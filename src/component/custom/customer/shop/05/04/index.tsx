import { useQuery } from "@tanstack/react-query"

import NTOption from "@/component/common/nt-option"
import { axiosInstance } from "@/config/axios"
import { CONDITION_LIST, TREATMENT_LIST } from "@/constant/tagList"
import { isUndefined } from "@/util/common/type-guard"

type TReview = {
	accompaniedIn: boolean
	comments: string[]
	conditionOptions: string[]
	contents: string
	createdAt: number
	createdBy: string | null
	imageIds: string[]
	imageUrls: string[]
	memberId: number
	modifiedAt: number
	modifiedBy: string | null
	nickname: string
	rating: number
	reviewId: number
	shopId: number
	treatmentOptions: string[]
}

export default function ShopReviewList({ shopId }: { shopId: number }) {
	const fetchReviews = async (shopId: number) => {
		const response = await axiosInstance().get(`/shops/${shopId}/reviews`)
		return response.data
	}

	const { data: shopReviews, isError } = useQuery({
		queryKey: ["shopReviews", shopId],
		queryFn: () => fetchReviews(shopId),
	})

	if (isUndefined(shopReviews))
		return (
			<div className="w-full">
				<p className="font-bold mb-6 text-2xl text-Title02">리뷰</p>
				<div className="mt-[50px] flex h-[100px] flex-col items-center justify-center text-Headline02 text-PB100">
					데이터가 존재하지 않습니다.
					<p className="py-[50px] text-Gray70">잠시 후 다시 시도해주세요.</p>
				</div>
			</div>
		)

	if (isError) {
		return (
			<div className="w-full">
				<p className="font-bold mb-6 text-2xl text-Title02">리뷰</p>
				<div className="mt-[50px] flex h-[100px] flex-col items-center justify-center text-Headline02 text-PB100">
					데이터를 불러오는 중에 오류가 발생했습니다.
					<p className="py-[50px] text-Gray70">잠시 후 다시 시도해주세요.</p>
				</div>
			</div>
		)
	}

	const shopReviewList = shopReviews.dataList

	const mapOptionsToReadableStrings = (
		options: string[] | undefined,
		list: { [key: string]: string },
	) => {
		return (options || []).map((option) => list[option] || option)
	}

	const getTags = (treatmentOptions: string[], conditionOptions: string[]) => {
		const treatmentTags = mapOptionsToReadableStrings(
			treatmentOptions,
			TREATMENT_LIST,
		)
		const conditionTags = mapOptionsToReadableStrings(
			conditionOptions,
			CONDITION_LIST,
		)
		return [...treatmentTags, ...conditionTags]
	}

	return (
		<div className="w-full p-[16px]">
			<p className="font-bold mb-6 text-2xl text-Title02">리뷰</p>
			<div className="flex flex-col gap-6">
				{shopReviewList.map((review: TReview, idx: number) => (
					<div
						key={idx}
						className="transform rounded-lg bg-white p-[24px] shadow-customGray transition duration-500 hover:shadow-xl"
					>
						<div className="mb-[16px] flex items-center">
							<p className="font-semibold text-Headline02 text-lg">
								{review.nickname}
							</p>
							<span className="ml-[12px] text-sm text-gray-500">
								{/* {review.visitCount}번째 방문 · {review.visitDate} */}
							</span>
						</div>
						<div className="mb-[16px] flex items-center">
							<div className="flex">
								{Array.from({ length: review.rating }, (_, idx) => (
									<span key={idx} className="text-[24px] text-PB100">
										★
									</span>
								))}
								{Array.from({ length: 5 - review.rating }, (_, idx) => (
									<span key={idx} className="text-[24px] text-gray-300">
										★
									</span>
								))}
							</div>
						</div>
						<div className="mb-[16px] flex flex-wrap gap-2">
							<NTOption
								optionArr={getTags(
									review.treatmentOptions,
									review.conditionOptions,
								)}
							/>
						</div>
						<p className="leading-relaxed text-gray-700">{review.contents}</p>
					</div>
				))}
			</div>
		</div>
	)
}
