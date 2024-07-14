import { setCookie } from "cookies-next"

import { ACCESS_TOKEN, IS_MANAGER, REFRESH_TOKEN } from "@/constant/auth-key"
import type { TSignDataResponse } from "@/type"

export const initAuthTokens = ({
	accessToken,
	role,
	refreshToken,
}: TSignDataResponse) => {
	const isManager = role === "MANAGER"
	setCookie(ACCESS_TOKEN, accessToken)
	setCookie(REFRESH_TOKEN, refreshToken, { maxAge: 86400 })
	setCookie(IS_MANAGER, isManager)
}
