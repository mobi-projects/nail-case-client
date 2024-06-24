export default function Manager_Base_Home_02() {
	return (
		<div className="flex h-fit min-h-[250px] w-full flex-col justify-between overflow-hidden rounded-[26px] border-[5px] border-orange-300">
			<Manager_Base_Home_02_01 />
			<Manager_Base_Home_02_02 />
			<Manager_Base_Home_02_02 />
			<Manager_Base_Home_02_02 />
			<Manager_Base_Home_02_03 />
		</div>
	)
}

function Manager_Base_Home_02_01() {
	return (
		<div className="flex h-[60px] w-full items-center justify-center border-[5px] border-green-300" />
	)
}

function Manager_Base_Home_02_02() {
	return (
		<div className="grid h-[126px] w-full grid-cols-[83px_800px_1fr] items-center gap-[27px] border-[5px] border-green-300 px-[27px]">
			<Manager_Base_Home_02_02_01 />
			<Manager_Base_Home_02_02_02 />
			<Manager_Base_Home_02_02_03 />
		</div>
	)
}
function Manager_Base_Home_02_02_01() {
	return <div className="h-full w-full border-[5px] border-blue-300" />
}
function Manager_Base_Home_02_02_02() {
	return <div className="h-full w-full border-[5px] border-blue-300" />
}
function Manager_Base_Home_02_02_03() {
	return (
		<div className="flex h-full w-full justify-end border-[5px] border-blue-300" />
	)
}

function Manager_Base_Home_02_03() {
	return (
		<div className="flex h-[60px] w-full items-center justify-center border-[5px] border-green-300 text-Headline02 text-Gray50">
			근무 종료
		</div>
	)
}
