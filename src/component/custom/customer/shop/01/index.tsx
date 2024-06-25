export default function Customer_Shop_01() {
	return (
		<div className="flex h-[480px] w-full">
			<div className="absolute left-0 flex h-[480px] w-full items-center justify-center border-[5px] border-orange-300">
				<div className="flex h-fit w-[1200px] flex-col gap-[50px]">
					<Customer_Shop_01_01 />
					<Customer_Shop_01_02 />
					<Customer_Shop_01_03 />
				</div>
			</div>
		</div>
	)
}
function Customer_Shop_01_01() {
	return <div className="h-[36px] w-full border-[5px] border-green-300"></div>
}
function Customer_Shop_01_02() {
	return <div className="h-[136px] w-full border-[5px] border-green-300"></div>
}
function Customer_Shop_01_03() {
	return <div className="h-[106px] w-full border-[5px] border-green-300"></div>
}
