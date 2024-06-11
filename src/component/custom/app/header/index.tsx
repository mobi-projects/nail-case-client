"use client"
//지워질예정
import { useRef } from "react"

import NTPulldown from "@/component/common/atom/nt-pulldown"
import NTIcon from "@/component/common/nt-icon"
import NTSearchfield from "@/component/common/nt-searchfield"
import { usePulldown } from "@/hook/use-component"

export default function Header() {
	const { isOpen, onClickItems, onClickTrigger, onClickWrapper, optionArr } =
		usePulldown(["발행한 소식", "임시저장", "예약"])
	const searchInputRef = useRef<HTMLInputElement>(null)

	return (
		<div className="flex flex-col items-center justify-center pt-[68px]">
			<div className="flex w-full max-w-[1200px] flex-col">
				<div className="h-[38px] w-[134px] text-3xl text-Gray90">newtips</div>
				{/* 변경예정 */}
				<div className="flex w-full justify-between gap-[70px] pb-[18px]">
					<div>
						<NTPulldown
							{...{
								isOpen,
								onClickItems,
								onClickTrigger,
								onClickWrapper,
								optionArr,
							}}
							//지워질예정
						></NTPulldown>
					</div>

					<div className="flex h-fit w-full justify-between">
						<div>
							<NTSearchfield size="large" ref={searchInputRef} />
						</div>
						<div className="flex gap-[12px]">
							<div className="flex items-center">
								<NTIcon className="text-Gray90" icon="bellLight"></NTIcon>
							</div>
							<div className="h-[50px] w-[50px] rounded-full bg-Gray20"></div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
