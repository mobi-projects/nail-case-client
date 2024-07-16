import { useQuery } from "@tanstack/react-query"

import NTOption from "@/component/common/nt-option"
import { QUERY_REVIEW_ARR } from "@/constant"
import { CONDITION_LIST, TREATMENT_LIST } from "@/constant/tagList"
import { getShopReview } from "@/util/api/shop-controller"
import { isUndefined } from "@/util/common/type-guard"

import { ErrorComponent, NotFountComponent, PendingComponent } from ".."

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
	const {
		data: shopReviews,
		isError,
		isPending,
	} = useQuery({
		queryKey: [QUERY_REVIEW_ARR, shopId],
		queryFn: () => getShopReview(shopId),
	})

	if (isUndefined(shopReviews)) return <NotFountComponent />
	if (isError) return <ErrorComponent />
	if (isPending) return <PendingComponent />

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
