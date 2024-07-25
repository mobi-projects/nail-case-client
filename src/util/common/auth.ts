import { deleteCookie, setCookie } from "cookies-next"

import { ACCESS_TOKEN, IS_MANAGER, REFRESH_TOKEN } from "@/constant/auth-key"
import type { TSignDataResponse, TRefreshDataResponse } from "@/type"

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
