import Image from "next/image"

import NTLogo from "@/../public/asset/nt-logo.svg"

export default function ManagerLayout() {
	return (
		<div className="flex h-fit w-full flex-col gap-[8.5px] pb-[14px] pt-[68px]">
			<Image src={NTLogo} alt="brand-logo" width={134} height={38} />
			<div className="flex h-fit w-full flex-col gap-[16.5px]">
				<ManagerLayoutCatalog />
				<Manager_Base_Layout_01_02 />
			</div>
		</div>
	)
}
function ManagerLayoutCatalog() {
	return (
		<div className="flex h-[51px] w-full items-center justify-between">
			<ManagerLayoutPullDown />
			<Manager_Base_Layout_01_01_02 />
			<Manager_Base_Layout_01_01_03 />
		</div>
	)
}
function ManagerLayoutPullDown() {
	return (
		<div className="h-[45px] w-[134px] bg-Gray10 text-Gray100">pull down</div>
	)
}
function Manager_Base_Layout_01_01_02() {
	return <div className="flex h-full w-full border-[5px] border-blue-500" />
}
function Manager_Base_Layout_01_01_03() {
	return <div className="flex h-full w-full border-[5px] border-blue-500" />
}
function Manager_Base_Layout_01_02() {
	return (
		<div className="flex h-[38px] w-full border-[5px] border-green-300">
			<Divider />
		</div>
	)
}
function Divider() {
	return <div className="absolute left-0 h-[1px] w-full bg-Gray10" />
}
