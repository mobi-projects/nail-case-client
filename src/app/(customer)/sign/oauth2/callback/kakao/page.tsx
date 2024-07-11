"use client"

import { useSearchParams } from "next/navigation"
import { useEffect, useRef } from "react"

import { useGetAuthToken } from "@/hook/use-auth-controller"
import type { TSignType } from "@/type/union-option/sign-type"

export default function KakaoLoginLanding() {
	const permissionCode = useSearchParams().get("code")
	const loginType = useSearchParams().get("state")

	const hasFetched = useRef(false) // stric mode에서 useEffect 2번 실행에 의한 오류를 막기위해 ref선언
	const { getAuthToken } = useGetAuthToken()

	useEffect(() => {
		if (permissionCode && !hasFetched.current && loginType) {
			// useEffect를 한번실행후 hasFetched를 true로 바꿔서 재실행을 막아줌
			hasFetched.current = true
			getAuthToken({ code: permissionCode, loginType: loginType as TSignType })
		}
	}, [permissionCode, getAuthToken, loginType])

	return <div className="h-full w-full bg-White" />
}
