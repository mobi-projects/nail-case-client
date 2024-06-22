import NTIcon from "@/component/common/nt-icon"

export default function ReviewList() {
	return (
		<div className="mt-[18px] flex w-full flex-col">
			<ReviewListItem />
			<hr />
			<ReviewListItem />
			<hr />
			<ReviewListItem />
			<hr />
			<ReviewListItem />
			<hr />
			<ReviewListItem />
		</div>
	)
}
function ReviewListItem() {
	return (
		<div className="my-[24px] flex w-full flex-col gap-[18px]">
			<ReviewerInfo />
			<Manager_Base_MyShop_Review_03_01_02 />
			<Manager_Base_MyShop_Review_03_01_03 />
		</div>
	)
}
function ReviewerInfo() {
	const starGrade = [true, true, true, true, false]
	//윗부분 삭제 예정
	return (
		<div className="flex h-[60px] w-full flex-col gap-[8px]">
			<div className="text-Headline01 font-Bold text-Gray80">닉네임</div>
			<div className="flex gap-[7px]">
				<div className="flex gap-[6px]">
					{starGrade.map((star, idx) => (
						<NTIcon
							icon="starFull"
							key={idx}
							className={`flex h-[18px] w-[18px] text-center ${star ? "text-PB100" : "text-Gray20"}`}
						></NTIcon>
					))}
				</div>
				<div className="text-Callout font-SemiBold text-Gray50">
					<span> 3번째 방문 </span>
					<span className="h-[4px] w-[4px]">﹒</span>
					<span>5월 24일 방문</span>
				</div>
			</div>
		</div>
	)
}
function Manager_Base_MyShop_Review_03_01_02() {
	return <div className="h-[60px] w-full border-[5px] border-blue-300"></div>
}
function Manager_Base_MyShop_Review_03_01_03() {
	return (
		<div className="flex h-fit min-h-[65px] w-full gap-[36px] border-[5px] border-blue-300">
			<Manager_Base_MyShop_Review_03_01_03_01 />
			<Manager_Base_MyShop_Review_03_01_03_02 />
		</div>
	)
}
function Manager_Base_MyShop_Review_03_01_03_01() {
	return (
		<div className="flex h-[165px] w-[180px] border-[5px] border-purple-300"></div>
	)
}
function Manager_Base_MyShop_Review_03_01_03_02() {
	return (
		<div className="flex h-fit min-h-[65px] w-[630px] border-[5px] border-purple-300"></div>
	)
}
