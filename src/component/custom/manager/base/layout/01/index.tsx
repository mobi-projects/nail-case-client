"use client"
import Image from "next/image"

import NTLogo from "@/../public/asset/nt-logo.svg"
import NTToolbar from "@/component/common/atom/nt-toolbar"
import { useToolbar } from "@/hook/use-component"

export default function Manager_Base_Layout_01() {
	return (
		<div className="flex h-fit w-full flex-col gap-[20px] border-[5px] border-orange-300 pb-[14px] pt-[68px]">
			<Image src={NTLogo} alt="brand-logo" width={134} height={38} />
			<div className="flex h-fit w-full flex-col gap-[18px]">
				<Manager_Base_Layout_01_01 />
				<ManagerLayoutToolbar />
			</div>
		</div>
	)
}
function Manager_Base_Layout_01_01() {
	return (
		<div className="grid h-[51px] w-full grid-cols-[200px_1fr_200px] items-center border-[5px] border-green-300">
			<Manager_Base_Layout_01_01_01 />
			<Manager_Base_Layout_01_01_02 />
			<Manager_Base_Layout_01_01_03 />
		</div>
	)
}
function Manager_Base_Layout_01_01_01() {
	return <div className="flex h-full w-full border-[5px] border-blue-500" />
}
function Manager_Base_Layout_01_01_02() {
	return <div className="flex h-full w-full border-[5px] border-blue-500" />
}
function Manager_Base_Layout_01_01_03() {
	return <div className="flex h-full w-full border-[5px] border-blue-500" />
}
function ManagerLayoutToolbar() {
	return (
		<div className="relative flex w-full flex-col">
			<hr className="absolute left-0 right-0 top-0 z-0 border border-Gray20" />
			<Divider />
		</div>
	)
}
function Divider() {
	const { hadleSelected, isSelected, toolbarArr } = useToolbar([
		"홈",
		"일정",
		"채팅",
		"내샵",
	])
	return (
		<div className="z-10 w-full">
			<NTToolbar
				isSelected={hadleSelected}
				selected={isSelected}
				arr={toolbarArr}
				position="top"
				topStyle="default"
			/>
		</div>
	)
}
