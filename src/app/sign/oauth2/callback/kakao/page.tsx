"use client"

import { useSearchParams } from "next/navigation"
import { Suspense, useEffect, useRef } from "react"

import { NTButton } from "@/component/common/atom/nt-button"
import NTLoadingSpinner from "@/component/common/nt-loading-spinner"
import { COMMON_HOME } from "@/constant/routing-path"
import { useGetAuthToken } from "@/hook/use-auth-controller"
import type { TSignType } from "@/type/union-option/sign-type"

export default function SuspenseLandingPage() {
	return (
		<Suspense fallback={<PendingFallback />}>
			<KakaoLoginLanding />
		</Suspense>
	)
}

function KakaoLoginLanding() {
	const permissionCode = useSearchParams().get("code")
	const loginType = useSearchParams().get("state")

	const hasFetched = useRef(false) // stric mode에서 useEffect 2번 실행에 의한 오류를 막기위해 ref선언
	const { mutate: getAuthToken, isError, isPending } = useGetAuthToken()

	useEffect(() => {
		if (permissionCode && !hasFetched.current && loginType) {
			// useEffect를 한번실행후 hasFetched를 true로 바꿔서 재실행을 막아줌
			hasFetched.current = true
			getAuthToken({ code: permissionCode, loginType: loginType as TSignType })
		}
	}, [permissionCode, getAuthToken, loginType])
	if (isPending) return <PendingFallback />
	if (isError) return <ErrorFallback />
	return <div className="h-full w-full bg-White" />
}

function PendingFallback() {
	return (
		<div className="flex h-dvh w-full flex-col items-center justify-center">
			<NTLoadingSpinner />
			<h1 className="text-Title02 font-SemiBold">Loading....</h1>
		</div>
	)
}

function ErrorFallback() {
	return (
		<div className="flex h-dvh w-full flex-col items-center justify-center gap-4">
			<h1 className="text-Title01 font-SemiBold text-PB100">
				죄송합니다. 로그인 중 오류가 발생했습니다.
			</h1>
			<p className="text-Body01 text-Gray70">
				인터넷 연결 상태를 확인하시고 다시 시도해주세요.
			</p>
			<p className="text-Body01 text-Gray70">
				문제가 지속되면 고객 지원팀에 문의해주세요.
			</p>
			<NTButton
				variant={"primary"}
				size={"medium"}
				flexible={"fit"}
				onClick={() => (window.location.href = COMMON_HOME)}
			>
				홈으로
			</NTButton>
		</div>
	)
}
