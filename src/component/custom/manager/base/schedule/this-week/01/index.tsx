export default function Manager_Base_Schedule_ThisWeek_01() {
	return (
		<div className="flex h-fit w-full flex-col border-[5px] border-orange-300">
			<Manager_Base_Schedule_ThisWeek_01_01 />
			<div className="flex flex-col gap-[15px]">
				<Manager_Base_Schedule_ThisWeek_01_02 />
				<Manager_Base_Schedule_ThisWeek_01_02 />
				<Manager_Base_Schedule_ThisWeek_01_02 />
				<Manager_Base_Schedule_ThisWeek_01_02 />
				<Manager_Base_Schedule_ThisWeek_01_02 />
				<Manager_Base_Schedule_ThisWeek_01_02 />
			</div>
		</div>
	)
}

function Manager_Base_Schedule_ThisWeek_01_01() {
	return <div className="h-[65px] w-full border-[5px] border-green-300" />
}

function Manager_Base_Schedule_ThisWeek_01_02() {
	return (
		<div className="grid h-[160px] w-full grid-cols-[75px_1fr_75px] border-[5px] border-green-300 px-[20px] py-[10px]">
			<Manager_Base_Schedule_ThisWeek_01_02_01 />
			<Manager_Base_Schedule_ThisWeek_01_02_02 />
			<Manager_Base_Schedule_ThisWeek_01_02_03 />
		</div>
	)
}
function Manager_Base_Schedule_ThisWeek_01_02_01() {
	return <div className="h-full w-full border-[5px] border-blue-300" />
}
function Manager_Base_Schedule_ThisWeek_01_02_02() {
	return (
		<div className="outline-r-ads h-full w-full border-[5px] border-blue-300" />
	)
}
function Manager_Base_Schedule_ThisWeek_01_02_03() {
	return <div className="h-full w-full border-[5px] border-blue-300" />
}
