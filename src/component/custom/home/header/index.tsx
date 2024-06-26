"use client"

import { useRef } from "react"

import NTIcon from "@/component/common/nt-icon"
import NTLogo from "@/component/common/nt-logo"
import NTSearchfield from "@/component/common/nt-searchfield"
import NTToolbar from "@/component/common/nt-toolbar"
import { useToolbar } from "@/hook/use-component"

export default function Header() {
	const searchInputRef = useRef<HTMLInputElement>(null)
	const { hadleSelected, isSelected, toolbarArr } = useToolbar([
		"홈",
		"일정",
		"채팅",
		"내샵",
	])
	return (
		<div className="flex flex-col items-center justify-center pt-[68px]">
			<div className="flex w-full max-w-[1200px] flex-col">
				<NTLogo />
				<div className="flex w-full justify-between gap-[70px] pb-[18px]">
					<div className="flex h-[3.5rem] w-[10rem] justify-center rounded-sm border border-Gray50 px-3 py-[10px]">
						모비네일
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
				<div className="w-full border-t-[1.5px] border-t-Gray20">
					<NTToolbar
						isSelected={hadleSelected}
						selected={isSelected}
						arr={toolbarArr}
						position="top"
					/>
				</div>
			</div>
		</div>
	)
}
