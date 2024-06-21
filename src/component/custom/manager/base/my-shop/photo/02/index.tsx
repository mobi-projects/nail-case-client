export default function Manager_Base_MyShop_Photo_02() {
	return (
		<div className="flex h-[480px] flex-col justify-center gap-[40px] border-[5px] border-orange-300">
			<Manager_Base_MyShop_Photo_02_01 />
			<Manager_Base_MyShop_Photo_02_02 />
		</div>
	)
}

function Manager_Base_MyShop_Photo_02_01() {
	return (
		<div className="flex h-[50px] justify-between border-[5px] border-green-300">
			<Manager_Base_MyShop_Photo_02_01_01 />
			<Manager_Base_MyShop_Photo_02_01_02 />
		</div>
	)
}
function Manager_Base_MyShop_Photo_02_01_01() {
	return <div className="h-full w-full border-[5px] border-blue-300" />
}
function Manager_Base_MyShop_Photo_02_01_02() {
	return <div className="h-full w-full border-[5px] border-blue-300" />
}
function Manager_Base_MyShop_Photo_02_02() {
	return <div className="flex h-[384px] w-full border-[5px] border-green-300" />
}
