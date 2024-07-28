import type { AxiosResponse } from "axios"
import { type CookieValueTypes } from "cookies-next"
import { jwtDecode } from "jwt-decode"

import type { TRefreshDataResponse } from "@/type"
import { postResquestNewToken } from "@/util/api/auth-controller"
import { getNowStamp } from "@/util/common"
import { setAuthTokens } from "@/util/common/auth"
import { isNull, isUndefined } from "@/util/common/type-guard"

import { getClientCookie } from "./get-client-cookie"
import { getServerCookie } from "./get-server-cookie"

let refreshTokenPromise: Promise<AxiosResponse<TRefreshDataResponse>> | null =
	null

/** 토큰의 만료 여부에 따라서 만료가 안 됐다면 기존 토큰 사용, 만료된 토큰이라면 토큰 갱신 후 갱신된 accessToken 반환 */
export const getValidAccessToken = async (
	token: CookieValueTypes,
): Promise<string> => {
	if (isExpired(token) && typeof window !== "undefined") {
		if (isNull(refreshTokenPromise)) {
			try {
				refreshTokenPromise = postResquestNewToken()
				const response = await refreshTokenPromise
				setAuthTokens(response.data) // 새로운 토큰 설정
				return response.data.accessToken // 갱신된 액세스 토큰 반환
			} catch (error) {
				return Promise.reject(error)
			} finally {
				refreshTokenPromise = null
			}
		}
		const response = await refreshTokenPromise
		return response.data.accessToken // 갱신된 accessToken정보 반환
	}

	return token as string // 기존 accessToken정보 반환
}
/** 전달받은 accessToken을 현재 timeStamp와 비교해서 만료된 토큰 여부 판단 */
export const isExpired = (token: CookieValueTypes): boolean => {
	const expTime = getTokenExpireTime(token)
	const now = getNowStamp()
	return expTime <= now
}

/** 전달받은 accessToken을 decode해서 만료시간 반환 */
const getTokenExpireTime = (token: CookieValueTypes): number => {
	if (isUndefined(token)) return 0
	const expireTime = jwtDecode(token).exp
	if (isUndefined(expireTime)) return 0
	return expireTime
}

/** 실행 환경 (server or client) 인지 판별해서 환경에 맞는 accessToken 반환 */
export const getAccessToken = async (): Promise<string | undefined> => {
	const token =
		typeof window === "undefined" ? getServerCookie() : getClientCookie()
	return Promise.resolve(token)
}
