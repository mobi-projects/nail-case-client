"use client"
import { NTButton } from "@/component/common/atom/nt-button"
import { COMMON_HOME } from "@/constant/routing-path"

export default function InvalidAccess() {
	return (
		<div className="flex h-dvh w-full flex-col items-center justify-center gap-4">
			<h1 className="text-Title01 font-SemiBold">
				이 페이지는 올바른 방법으로 접근하지 않았습니다.
			</h1>
			<p className="text-Body01 text-Gray80"> 올바른 경로로 돌아가세요.</p>
			<NTButton
				variant={"primary"}
				size={"small"}
				flexible={"fit"}
				onClick={() => {
					window.location.href = COMMON_HOME
				}}
			>
				홈으로
			</NTButton>
		</div>
	)
}
