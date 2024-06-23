import NTIcon from "@/component/common/nt-icon"

export default function Manager_Base_MyShop_Review_01() {
	return (
		<div className="flex w-full flex-col gap-[20px] py-[18px]">
			<ManagerMyShopReviewTotal />
			<ReivewScore />
		</div>
	)
}
function ManagerMyShopReviewTotal() {
	return (
		<div className="flex gap-[7px] text-Title03 font-SemiBold">
			<span>리뷰</span>
			<span className="text-PB100">N</span>
		</div>
	)
}
function ReivewScore() {
	return (
		<div className="mb-[5px] flex h-[240px] w-full items-center justify-between gap-[24px] rounded-[26px] bg-BGblue01 px-[4px] py-[40px]">
			<ReviewTotalScore />
			<ReviewGraphScore />
		</div>
	)
}
function ReviewTotalScore() {
	const reviewTotalPoint = [1, 2, 3, 4, 5]
	const reviewCurrentPoint = 4.6
	return (
		<div className="flex h-full w-full items-center justify-center gap-[26px]">
			<div className="flex gap-[14px]">
				{reviewTotalPoint.map((idx) => (
					<NTIcon icon="starFull" className="text-PB100" key={idx} />
				))}
			</div>
			<div className="text-LargeTitle font-Bold">{reviewCurrentPoint}</div>
		</div>
	)
}
type TReview = {
	[key: number]: number
}
function ReviewGraphScore() {
	const reviewer: Array<TReview> = [
		{ 5: 228 },
		{ 4: 75 },
		{ 3: 16 },
		{ 2: 1 },
		{ 1: 2 },
	]
	const totalReviewer = reviewer.reduce((acc, curr) => {
		const score = Number(Object.keys(curr)[0])
		const count = curr[score]
		return acc + count
	}, 0)
	return (
		<div className="flex h-full w-full flex-col items-center justify-center border-l-2 border-Gray20 px-[77px]">
			<div className="flex w-full flex-col justify-start gap-[12px]">
				{reviewer.map((item, idx) => {
					const score = Number(Object.keys(item)[0])
					const count = item[score]
					const widthPercentage = (count / totalReviewer) * 100
					return (
						<div
							className="flex items-center justify-start gap-[24px] text-Body02 font-SemiBold text-Gray50 active:text-PB100"
							key={idx}
						>
							<span className="w-6">{score}점</span>
							<ReviewGraph widthPercentage={widthPercentage} />
							<span>{count}</span>
						</div>
					)
				})}
			</div>
		</div>
	)
}

type ReviewGraphPT = {
	widthPercentage: number
}
function ReviewGraph({ widthPercentage }: ReviewGraphPT) {
	return (
		<div className="h-[10px] w-[340px] rounded-[23px] bg-gray-200">
			<div
				className={"h-full rounded-[23px] bg-PB100"}
				style={{ width: `${widthPercentage}%` }}
			/>
		</div>
	)
}
