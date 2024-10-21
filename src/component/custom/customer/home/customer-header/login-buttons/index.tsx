"use client"

import { useRouter } from "next/navigation"

import { NTButton } from "@/component/common/atom/nt-button"
import { COMMON_SIGN } from "@/constant/routing-path"

export function LoginButtons() {
	const router = useRouter()
	return (
		<div className="flex items-center justify-center gap-x-7">
			<button
				className="text-Body01"
				onClick={() => {
					router.push(`${COMMON_SIGN}/member`)
				}}
			>
				로그인
			</button>
			<NTButton
				variant={"primary"}
				size={"small"}
				flexible={"fit"}
				onClick={() => {
					router.push(`${COMMON_SIGN}/manager`)
				}}
			>
				shop 관리
			</NTButton>
		</div>
	)
}
