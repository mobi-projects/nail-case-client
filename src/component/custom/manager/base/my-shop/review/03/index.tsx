export default function Manager_Base_MyShop_Review_03() {
	return (
		<div className="mt-[18px] flex w-full flex-col gap-[25px] border-[5px] border-orange-300">
			<Manager_Base_MyShop_Review_03_01 />
			<Manager_Base_MyShop_Review_03_01 />
			<Manager_Base_MyShop_Review_03_01 />
			<Manager_Base_MyShop_Review_03_01 />
			<Manager_Base_MyShop_Review_03_01 />
		</div>
	)
}
function Manager_Base_MyShop_Review_03_01() {
	return (
		<div className="flex w-full flex-col gap-[16px] border-[5px] border-green-300">
			<Manager_Base_MyShop_Review_03_01_01 />
			<ReviewerTag />
			<Manager_Base_MyShop_Review_03_01_03 />
		</div>
	)
}
function Manager_Base_MyShop_Review_03_01_01() {
	return <div className="h-[60px] w-full border-[5px] border-blue-300"></div>
}
function ReviewerTag() {
	const tagList = [
		"이달의 아트",
		"동반 2인",
		"타샵 제거 있음",
		" 1인 연장 필요",
	]
	return (
		<div className="flex h-[60px] w-full gap-[10px] pt-[3px]">
			{tagList.map((tag, idx) => (
				<div
					key={idx}
					className="h-fit w-fit rounded-[20.34px] bg-BGblue01 px-[18px] py-[12px] text-Body02 text-PB100"
				>
					{tag}
				</div>
			))}
		</div>
	)
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
