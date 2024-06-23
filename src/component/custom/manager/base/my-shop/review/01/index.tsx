export default function Manager_Base_MyShop_Review_01() {
	return (
		<div className="flex w-full flex-col gap-[20px] border-[5px] border-orange-300">
			<Manager_Base_MyShop_Review_01_01 />
			<Manager_Base_MyShop_Review_01_02 />
		</div>
	)
}
function Manager_Base_MyShop_Review_01_01() {
	return (
		<div className="h-[30px] w-full items-center border-[5px] border-green-300" />
	)
}
function Manager_Base_MyShop_Review_01_02() {
	return (
		<div className="flex h-[240px] w-full items-center justify-between border-[5px] border-green-300 py-[40px]">
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
