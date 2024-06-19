export default function Manager_Base_Schedule_Layout_01() {
	return (
		<div className="grid w-full grid-rows-[70px_76px_62px] items-center border-[5px] border-orange-300">
			<p className="text-Title03">일정</p>
			<Manager_Base_Schedule_Layout_01_01 />
			<Manager_Base_Schedule_Layout_01_02 />
		</div>
	)
}

function Manager_Base_Schedule_Layout_01_01() {
	return <div className="h-full w-full border-[5px] border-green-300" />
}
function Manager_Base_Schedule_Layout_01_02() {
	return <div className="h-full w-full border-[5px] border-green-300" />
}
