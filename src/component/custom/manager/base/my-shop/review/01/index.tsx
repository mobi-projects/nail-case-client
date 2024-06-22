import NTIcon from "@/component/common/nt-icon"

export default function Manager_Base_MyShop_Review_01() {
	return (
		<div className="flex w-full flex-col gap-[20px] border-[5px] border-orange-300">
			<Manager_Base_MyShop_Review_01_01 />
			<ReivewScore />
		</div>
	)
}
function Manager_Base_MyShop_Review_01_01() {
	return (
		<div className="h-[30px] w-full items-center border-[5px] border-green-300" />
	)
}
function ReivewScore() {
	return (
		<div className="mb-[5px] flex h-[240px] w-full items-center justify-between gap-[24px] rounded-[26px] bg-BGblue01 px-[4px] py-[40px]">
			<ReviewTotalScore />
			<Manager_Base_MyShop_Review_01_02_02 />
		</div>
	)
}
function ReviewTotalScore() {
	const reviewTotalPoint = [1, 2, 3, 4, 5]
	const reviewCurrentPoint = 4.6
	return (
		<div className="flex h-full w-full items-center justify-center gap-[26px]">
			<div className="flex gap-[14px]">
				{reviewTotalPoint.map((index) => (
					<NTIcon
						icon="starFull"
						className="text-PB100 opacity-25"
						key={index}
					/>
				))}
			</div>
			<div className="text-LargeTitle font-Bold">{reviewCurrentPoint}</div>
		</div>
	)
}
function Manager_Base_MyShop_Review_01_02_02() {
	return <div className="h-full w-full border-[5px] border-blue-300" />
}
