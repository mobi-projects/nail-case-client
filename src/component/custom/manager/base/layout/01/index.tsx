"use client"
import Image from "next/image"
import { usePathname, useRouter } from "next/navigation"

import NTLogo from "@/../public/asset/nt-logo.svg"
import {
	NTPulldownContent,
	NTPulldownItem,
	NTPulldownLabel,
	NTPulldownTrigger,
	useNTPulldown,
} from "@/component/common/atom/nt-pulldown"
import NTIcon from "@/component/common/nt-icon"
import NTToolbar from "@/component/common/nt-toolbar"
import { cn } from "@/config/tailwind"
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
			{/* <ManagerLayoutSearchfield /> */}
			<ManagerLayoutSubCatalog />
		</div>
	)
}

function ManagerLayoutPullDown() {
	const { isOpen, clickedIdx, selectIdx } = useNTPulldown()
	const ShopList = ["모비네일 한남", "다라네일 한남", "마바네일 한남"]
	return (
		<div className="relative h-fit w-fit">
			<NTPulldownTrigger className="flex w-[134px] min-w-[134px] cursor-pointer items-center justify-center gap-x-1 rounded-[6px] border border-transparent bg-Gray10 px-[6px] py-[8px] transition-all duration-500 ease-in-out hover:border-Gray40">
				<h2 className="truncate text-[16px] font-Medium">
					{ShopList[clickedIdx]}
				</h2>
				<NTIcon
					icon="expandDownLight"
					className={cn(
						"h-6 w-6 text-Gray40 transition-all duration-75",
						isOpen ? "-rotate-180" : "",
					)}
				/>
			</NTPulldownTrigger>
			<NTPulldownContent position="left" className="rounded-[14px]">
				<NTPulldownLabel className="border-b-[1px] border-Gray40 px-2 py-3 text-Body01 font-SemiBold text-Gray80">
					지점을 선택해주세요
				</NTPulldownLabel>
				{ShopList.map((shop, idx) => (
					<NTPulldownItem
						className="flex cursor-pointer items-center justify-between px-4 py-2 hover:bg-Gray10"
						key={idx}
						onClick={() => selectIdx(idx)}
					>
						<p className="truncate text-Body02 text-Gray70">{shop}</p>
						<NTIcon
							icon="check"
							className={cn(
								"h-6 w-6",
								clickedIdx === idx ? "opacity-100" : "opacity-0",
							)}
						/>
					</NTPulldownItem>
				))}
			</NTPulldownContent>
		</div>
	)
}
// function ManagerLayoutSearchfield() {
//    const searchInputRef = useRef<HTMLInputElement>(null)
//    return (
//       <div className="mx-[70px] h-full w-[690px]">
//          <NTSearchfield size="large" ref={searchInputRef} />
//       </div>
//    )
// }
function ManagerLayoutSubCatalog() {
	return (
		<div className="flex w-[236px] items-center justify-end gap-[12px] pr-[21px]">
			<NTIcon className="text-Gray90" icon="bellLight" />
			<div className="h-[50px] w-[50px] rounded-full bg-Gray20"></div>
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
