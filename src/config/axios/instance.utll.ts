import type { InternalAxiosRequestConfig } from "axios"
import axios from "axios"

import { postResquestNewToken } from "@/util/api/auth-controller"
import { setAuthTokens } from "@/util/common/auth"
import { isUndefined } from "@/util/common/type-guard"

// import { setTokens } from "./instance"

//**********  401 에러 발생 시 실행 *************//
export const handleUnauthorized401 = async (
	config: InternalAxiosRequestConfig | undefined,
) => {
	const originalRequest = config
	if (isUndefined(originalRequest)) return
	try {
		// 토큰 refresh요청
		const response = await postResquestNewToken()
		// cookie 재설정
		setAuthTokens(response.data)
		// 기존 api요청 header에 재발급 받은 accessToken을 담아서 재요청
		originalRequest.headers.Authorization = `Bearer ${response.data.accessToken}`
		return axios(originalRequest)
	} catch (error) {
		throw error
	}
}
