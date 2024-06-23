export default function Manager_Base_Home_01() {
	return (
		<div className="flex h-[240px] w-full justify-between gap-[24px] border-[5px] border-orange-300">
			<Manager_Base_Home_01_01 />
			<Manager_Base_Home_01_02 />
		</div>
	)
}

function Manager_Base_Home_01_01() {
	return (
		<div className="flex h-full w-[792px] border-[5px] border-green-300 p-[24px]">
			<Manager_Base_Home_01_01_01 />
			<Manager_Base_Home_01_01_02 />
		</div>
	)
}
function Manager_Base_Home_01_01_01() {
	return <div className="flex h-full w-[200px] border-[5px] border-blue-300" />
}
function Manager_Base_Home_01_01_02() {
	return (
		<div className="flex h-full w-full flex-col border-[5px] border-blue-300">
			<Manager_Base_Home_01_01_02_01 />
			<Manager_Base_Home_01_01_02_02 />
		</div>
	)
}
function Manager_Base_Home_01_01_02_01() {
	return (
		<div className="flex h-[50px] w-full flex-col border-[5px] border-purple-300" />
	)
}
function Manager_Base_Home_01_01_02_02() {
	return (
		<div className="flex h-full w-full flex-col border-[5px] border-purple-300" />
	)
}

function Manager_Base_Home_01_02() {
	return (
		<div className="flex h-full w-[384px] flex-col justify-between border-[5px] border-green-300 p-[24px]">
			<Manager_Base_Home_01_02_01 />
			<Manager_Base_Home_01_02_02 />
		</div>
	)
}
function Manager_Base_Home_01_02_01() {
	return <div className="flex h-[58px] w-full border-[5px] border-blue-300" />
}
function Manager_Base_Home_01_02_02() {
	return <div className="flex h-[58px] w-full border-[5px] border-blue-300" />
}
