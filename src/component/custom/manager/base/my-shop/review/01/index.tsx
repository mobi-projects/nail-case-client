export default function Manager_Base_MyShop_Review_01() {
	return (
		<div className="flex w-full flex-col gap-[20px] py-[18px]">
			<ManagerMyShopReviewTotal />
			<Manager_Base_MyShop_Review_01_02 />
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
function Manager_Base_MyShop_Review_01_02() {
	return (
		<div className="mb-[5px] flex h-[240px] w-full items-center justify-between gap-[24px] rounded-[26px] bg-BGblue01 px-[4px] py-[40px]">
			<Manager_Base_MyShop_Review_01_02_01 />
			<Manager_Base_MyShop_Review_01_02_02 />
		</div>
	)
}
function Manager_Base_MyShop_Review_01_02_01() {
	return <div className="h-full w-full border-[5px] border-blue-300" />
}
function Manager_Base_MyShop_Review_01_02_02() {
	return <div className="h-full w-full border-[5px] border-blue-300" />
}
