import { NTButton } from "@/component/common/atom/nt-button"

export default function Manager_Sub_Photo_02() {
	return (
		<div className="flex h-[480px] w-full justify-between border-[5px] border-orange-300">
			<Manager_Sub_Photo_02_01 />
			<Manager_Sub_Photo_02_02 />
		</div>
	)
}
function Manager_Sub_Photo_02_01() {
	return <div className="h-full w-[486.94px] border-[5px] border-green-300" />
}
function Manager_Sub_Photo_02_02() {
	return (
		<div className="flex h-full w-[522.11px] flex-col items-center justify-between border-[5px] border-green-300">
			<Manager_Sub_Photo_02_02_01 />
			<Manager_Sub_Photo_02_02_02 />
		</div>
	)
}

function Manager_Sub_Photo_02_02_01() {
	return <div className="h-[308px] w-full border-[5px] border-blue-300" />
}
function Manager_Sub_Photo_02_02_02() {
	return (
		<div className="flex h-fit w-full items-center justify-end border-[5px] border-blue-300">
			<NTButton disabled>등록하기</NTButton>
		</div>
	)
}
