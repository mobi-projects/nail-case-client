"use client"

import { useRef } from "react"

import NTIcon from "@/component/common/nt-icon"
import NTLogo from "@/component/common/nt-logo"
import NTSearchfield from "@/component/common/nt-searchfield"

export default function Header() {
	const searchInputRef = useRef<HTMLInputElement>(null)

	return (
		<div className="flex flex-col items-center justify-center pt-[68px]">
			<div className="flex w-full max-w-[1200px] flex-col">
				<NTLogo />
				<div className="flex w-full justify-between gap-[70px] pb-[18px]">
					<div
					//NTPullDown pr 수정시 지워질예정d
					></div>
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
			</div>
		</div>
	)
}
