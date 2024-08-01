import type { AxiosResponse } from "axios"
import { type CookieValueTypes } from "cookies-next"
import { jwtDecode } from "jwt-decode"

import type { TRefreshDataResponse } from "@/type"
import { postResquestNewToken } from "@/util/api/auth-controller"
import { getNowStamp } from "@/util/common"
import { deleteAllCookies, setAuthTokens } from "@/util/common/auth"
import { isNull, isUndefined } from "@/util/common/type-guard"

import { getClientCookie } from "./get-client-cookie"
import { getServerCookie } from "./get-server-cookie"

let refreshPromise: Promise<AxiosResponse<TRefreshDataResponse>> | null = null

/** 토큰의 만료 여부에 따라서 만료가 안 됐다면 기존 토큰 사용, 만료된 토큰이라면 토큰 갱신 후 갱신된 accessToken 반환 */
export const getValidAccessToken = async (token: CookieValueTypes) => {
	if (isServer()) return token as string
	if (!isExpired(token)) return token as string // 유효한 토큰이라면 그대로 반환

	if (isNull(refreshPromise)) {
		try {
			refreshPromise = postResquestNewToken()
			const { data: newTokens } = await refreshPromise
			setAuthTokens(newTokens) // 새로운 토큰 설정
			return newTokens.accessToken // 갱신된 액세스 토큰 반환
		} catch (error) {
			handleRefreshingError()
			return Promise.reject(error)
		} finally {
			refreshPromise = null
		}
	} else {
		const { data: newTokens } = await refreshPromise
		return newTokens.accessToken // 기존 요청중인 토큰 갱신을 기다린후 새로발급된 accessToken을 반환
	}
}

/** 에러 발생시 세션만료 & 사용자 홈으로 redirect */
const handleRefreshingError = () => {
	deleteAllCookies()
}

/** 전달받은 accessToken을 현재 timeStamp와 비교해서 만료된 토큰 여부 판단 */
export const isExpired = (token: CookieValueTypes): boolean => {
	const expTime = getTokenExpireTime(token)
	const now = getNowStamp()
	return expTime <= now
}

/** server or client 어떤환경에서 실행하는지 반환 */
export const isServer = (): boolean => {
	return typeof window === "undefined"
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
	const token = isServer() ? getServerCookie() : getClientCookie()
	return Promise.resolve(token)
}
