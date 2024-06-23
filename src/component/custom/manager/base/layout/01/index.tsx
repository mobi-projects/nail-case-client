"use client"
import Image from "next/image"
import { useRef } from "react"

import NTLogo from "@/../public/asset/nt-logo.svg"
import NTToolbar from "@/component/common/atom/nt-toolbar"
import NTIcon from "@/component/common/nt-icon"
import NTSearchfield from "@/component/common/nt-searchfield"
import { useToolbar } from "@/hook/use-component"

export default function ManagerLayout() {
	return (
		<div className="flex h-fit w-full flex-col gap-[8.5px] pb-[14px] pt-[68px]">
			<Image src={NTLogo} alt="brand-logo" width={134} height={38} priority />
			<div className="flex h-fit w-full flex-col gap-[16.5px]">
				<ManagerLayoutCatalog />
				<ManagerLayoutToolbar />
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
function ManagerLayoutToolbar() {
	return (
		<div className="flex w-full flex-col">
			<hr className="absolute left-0 z-[-10] w-full border border-Gray10" />
			<Toolbar />
		</div>
	)
}
function Toolbar() {
	const { hadleSelected, isSelected, toolbarArr } = useToolbar([
		"홈",
		"일정",
		"채팅",
		"내샵",
	])
	return (
		<NTToolbar
			isSelected={hadleSelected}
			selected={isSelected}
			arr={toolbarArr}
			position="top"
			topStyle="default"
		/>
	)
}
