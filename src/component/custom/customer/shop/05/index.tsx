export default function Customer_Shop_05() {
	return (
		<div className="flex h-fit w-full flex-col gap-[24px] border-[5px] border-orange-300">
			<Customer_Shop_05_01 />
			<Customer_Shop_05_01 />
			<Customer_Shop_05_01 />
		</div>
	)
}

function Customer_Shop_05_01() {
	return (
		<div className="grid h-[160px] w-full grid-cols-[233.6px_1fr] gap-[24px] rounded-[26px] border-[5px] border-green-300 px-[25px] py-[20px]">
			<Customer_Shop_05_01_01 />
			<Customer_Shop_05_01_02 />
		</div>
	)
}
function Customer_Shop_05_01_01() {
	return <div className="h-full w-full border-[5px] border-blue-300" />
}
function Customer_Shop_05_01_02() {
	return <div className="h-full w-full border-[5px] border-blue-300" />
}
