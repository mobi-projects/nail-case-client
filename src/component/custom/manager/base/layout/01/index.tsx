"use client"
import Image from "next/image"
import { usePathname, useRouter } from "next/navigation"
import { useRef } from "react"

import NTLogo from "@/../public/asset/nt-logo.svg"
import NTSearchfield from "@/component/common/nt-searchfield"
import NTToolbar from "@/component/common/nt-toolbar"
import {
	MANAGER_BASE_MYSHOP_HOME,
	MANAGER_BASE_SCHEDULE_LIST,
} from "@/constant/routing-path"
import {
	LABEL_LIST_FOR_MANAGER_BASE_TOOLBAR,
	PATH_LIST_FOR_MANAGER_BASE_MYSHOP_TOOLBAR,
	PATH_LIST_FOR_MANAGER_BASE_SCHEDULE_TOOLBAR,
	PATH_LIST_FOR_MANAGER_BASE_TOOLBAR,
} from "@/constant/toolbar-list"

import HeaderMenu from "../header-menu"

export default function ManagerBaseHeader() {
	return (
		<div className="flex h-fit w-full flex-col gap-[8.5px] pb-[14px] pt-[68px]">
			<Image src={NTLogo} alt="brand-logo" width={134} height={38} priority />
			<div className="flex h-fit w-full flex-col gap-[16.5px]">
				<ManagerLayoutCatalog />
				<ManagerBaseToolbar />
			</div>
		</div>
	)
}
function ManagerLayoutCatalog() {
	return (
		<div className="flex h-[51px] w-full items-center justify-between">
			<ManagerLayoutPullDown />
			<ManagerLayoutSearchfield />
			<HeaderMenu />
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

function ManagerBaseToolbar() {
	const pathName = usePathname()
	const router = useRouter()
	const focusedIdx = getFocusedIdx(
		pathName,
		[...PATH_LIST_FOR_MANAGER_BASE_TOOLBAR],
		[...PATH_LIST_FOR_MANAGER_BASE_MYSHOP_TOOLBAR],
		[...PATH_LIST_FOR_MANAGER_BASE_SCHEDULE_TOOLBAR],
	)
	const onClickTool = (idx: number) =>
		router.push(PATH_LIST_FOR_MANAGER_BASE_TOOLBAR[idx])
	return (
		<div className="flex w-full flex-col">
			<hr className="absolute left-0 z-[-10] w-full border border-Gray10" />
			<NTToolbar
				toolList={[...LABEL_LIST_FOR_MANAGER_BASE_TOOLBAR]}
				focusedIdx={focusedIdx}
				position="top"
				onClickTool={onClickTool}
			/>
		</div>
	)
}
const getFocusedIdx = (
	pathName: string,
	toolPathArr: string[],
	myShopPathArr: string[],
	schedulePathArr: string[],
) => {
	if (myShopPathArr.includes(pathName)) pathName = MANAGER_BASE_MYSHOP_HOME
	if (schedulePathArr.includes(pathName)) pathName = MANAGER_BASE_SCHEDULE_LIST
	return toolPathArr.findIndex((toolPath) => toolPath === pathName)
}
