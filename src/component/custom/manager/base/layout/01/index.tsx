"use client"
import Image from "next/image"
import { useRef } from "react"

import NTLogo from "@/../public/asset/nt-logo.svg"
import NTIcon from "@/component/common/nt-icon"
import NTSearchfield from "@/component/common/nt-searchfield"

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
			<ManagerLayoutSearchfield />
			<ManagerLayoutSubCatalog />
		</div>
	)
}
function ManagerLayoutPullDown() {
	return (
		<div className="h-[45px] w-[134px] bg-Gray10 text-Gray100">pull down</div>
	)
}
function ManagerLayoutSearchfield() {
	const searchInputRef = useRef<HTMLInputElement>(null)
	return (
		<div className="mx-[70px] h-full w-[690px]">
			<NTSearchfield size="large" ref={searchInputRef} />
		</div>
	)
}
function ManagerLayoutSubCatalog() {
	return (
		<div className="flex w-[236px] items-center justify-end gap-[12px] pr-[21px]">
			<NTIcon className="text-Gray90" icon="bellLight" />
			<div className="h-[50px] w-[50px] rounded-full bg-Gray20"></div>
		</div>
	)
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
