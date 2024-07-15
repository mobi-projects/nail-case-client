import { setCookie } from "cookies-next"

import { ACCESS_TOKEN, REFRESH_TOKEN } from "@/constant/auth-key"
import type { TRefreshDataResponse } from "@/type"

/** accessToken, refreshToken cookie에 추가 */
export const setAuthTokens = (response: TRefreshDataResponse) => {
	setCookie(ACCESS_TOKEN, response.accessToken)
	setCookie(REFRESH_TOKEN, response.refreshToken, {
		maxAge: 86400,
	})
}
