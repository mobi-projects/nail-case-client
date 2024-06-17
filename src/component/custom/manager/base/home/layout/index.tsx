"use client"

import { useRef } from "react"

import NTToolbar from "@/component/common/atom/nt-toolbar"
import NTIcon from "@/component/common/nt-icon"
import NTLogo from "@/component/common/nt-logo"
import NTSearchfield from "@/component/common/nt-searchfield"
import { useToolbar } from "@/hook/use-component"

export default function ManagerBaseHeader() {
	const searchInputRef = useRef<HTMLInputElement>(null)
	const { hadleSelected, isSelected, toolbarArr } = useToolbar([
		"홈",
		"일정",
		"채팅",
		"내샵",
	])
	return (
		<div className="flex flex-col items-center justify-center pt-[68px]">
			<div className="flex w-full max-w-[1200px] flex-col gap-[8px]">
				<NTLogo />
				<div className="flex w-full justify-between gap-[70px] pb-[18px]">
					<div className="flex h-[3.5rem] w-[10rem] items-center justify-center rounded-[6px] bg-Gray10 px-3 py-[10px] text-Button font-Regular text-Gray100">
						pull down
					</div>
					<div className="flex h-fit w-full justify-between">
						<NTSearchfield size="large" ref={searchInputRef} />
						<div className="flex gap-[12px]">
							<div className="flex items-center">
								<NTIcon className="text-Gray90" icon="bellLight" />
							</div>
							<div className="h-[50px] w-[50px] rounded-full bg-Gray20"></div>
						</div>
					</div>
				</div>
				<div className="relative flex w-full flex-col">
					<hr className="absolute left-0 right-0 top-0 z-0 border border-Gray20" />
					<div className="z-10 w-full">
						<NTToolbar
							isSelected={hadleSelected}
							selected={isSelected}
							arr={toolbarArr}
							position="top"
							topStyle="default"
						/>
					</div>
				</div>
			</div>
		</div>
	)
}
