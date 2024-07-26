import { isAxiosError } from "axios"
import { deleteCookie, setCookie } from "cookies-next"
import { toast } from "sonner"

import { ACCESS_TOKEN, IS_MANAGER, REFRESH_TOKEN } from "@/constant/auth-key"
import { COMMON_HOME } from "@/constant/routing-path"
import type { TSignDataResponse, TRefreshDataResponse } from "@/type"

import { postLogout } from "../api/auth-controller"

export const initAuthTokens = ({
	accessToken,
	role,
	refreshToken,
}: TSignDataResponse) => {
	const isManager = role === "MANAGER"
	setCookie(ACCESS_TOKEN, accessToken)
	setCookie(REFRESH_TOKEN, refreshToken, { maxAge: 86400 })
	setCookie(IS_MANAGER, isManager, { maxAge: 86400 })
}

/** accessToken, refreshToken cookie에 추가 */
export const setAuthTokens = (response: TRefreshDataResponse) => {
	setCookie(ACCESS_TOKEN, response.accessToken)
	setCookie(REFRESH_TOKEN, response.refreshToken, {
		maxAge: 86400,
	})
}

/** 모든 쿠키 삭제 */
export const deleteAllCookies = () => {
	deleteCookie(ACCESS_TOKEN)
	deleteCookie(IS_MANAGER)
	deleteCookie(REFRESH_TOKEN)
	deleteCookie("profile-image")
}

export const handleLogout = async () => {
	try {
		await postLogout()
		toast.success("안녕히 가세요")
	} catch (error) {
		if (isAxiosError(error) && error.response?.status === 500) {
			toast.warning("네트워크 문제가 발생했습니다. 다시 로그인 해주세요")
		} else {
			toast.error("로그아웃 중 오류가 발생했습니다.")
		}
	} finally {
		deleteAllCookies()
		setTimeout(() => {
			window.location.href = COMMON_HOME
		}, 1000)
	}
}
