"use client"

import { cva } from "class-variance-authority"
import { useSearchParams } from "next/navigation"
import { useEffect, useRef } from "react"

import { NTButton } from "@/component/common/atom/nt-button"
import { COMMON_HOME } from "@/constant/routing-path"
import { useGetAuthToken } from "@/hook/use-auth-controller"
import type { TSignType } from "@/type/union-option/sign-type"

export default function KakaoLoginLanding() {
	const permissionCode = useSearchParams().get("code")
	const loginType = useSearchParams().get("state")

	const hasFetched = useRef(false) // stric mode에서 useEffect 2번 실행에 의한 오류를 막기위해 ref선언
	const { getAuthToken, isError, isPending } = useGetAuthToken()

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
			<LoadingSpinner />
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

type LoadingSpinnerPT = { size?: "small" | "medium" | "large" }
function LoadingSpinner({ size }: LoadingSpinnerPT) {
	const LoadingSpinnerVariants = cva("animate-spin fill-PB100 text-Gray20", {
		variants: {
			size: {
				small: "h-8 w-8 ",
				medium: "h-14 w-14 ",
				large: "h-20 w-20 ",
			},
		},
		defaultVariants: { size: "medium" },
	})
	return (
		<div>
			<svg
				aria-hidden="true"
				className={LoadingSpinnerVariants({ size })}
				viewBox="0 0 100 101"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
					fill="currentColor"
				/>
				<path
					d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
					fill="currentFill"
				/>
			</svg>
		</div>
	)
}
