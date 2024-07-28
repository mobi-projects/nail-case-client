import type { AxiosInstance, AxiosRequestConfig } from "axios"
import axios from "axios"

import { getAccessToken, getValidAccessToken } from "./instance.utll"

const instanceConfig: AxiosRequestConfig = {
	baseURL: process.env.NEXT_PUBLIC_BACKEND_APP,
	withCredentials: true,
}

type TContentType = "multipart/form-data" | "application/json"
export const axiosInstance = (
	contentType: TContentType = "application/json",
) => {
	let instance = axios.create(instanceConfig)
	instance = setRequestInterceptor(instance, contentType)

	return instance
}

/** "요청" 인터셉터 설정 */
const setRequestInterceptor = (
	instance: AxiosInstance,
	contentType: TContentType,
) => {
	instance.interceptors.request.use(
		async (config) => {
			const accessToken = await getAccessToken() // 실행환경에 맞는 accessToken 저장
			const validAccessToken = await getValidAccessToken(accessToken) // 토큰 만료여부에 따라서 유효한 토큰 반환
			if (validAccessToken && config.headers) {
				config.headers.Authorization = `Bearer ${validAccessToken}`
			}

			config.headers["Content-Type"] = contentType
			return config
		},
		(error) => Promise.reject(error),
	)
	instance.defaults.paramsSerializer = function (paramObj) {
		const params = new URLSearchParams()
		for (const key in paramObj) params.append(key, paramObj[key])
		return params.toString()
	}
	return instance
}
