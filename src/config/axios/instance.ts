import type { AxiosInstance, AxiosRequestConfig } from "axios"
import axios from "axios"

import { getAccessTokenAtClient, isNull } from "@/util/common"

const instanceConfig: AxiosRequestConfig = {
	headers: {
		"Content-Type": "application/json",
	},
	withCredentials: true,
}
export const axiosInstance = () => {
	let instance = axios.create(instanceConfig)
	instance = setRequestInterceptor(instance)
	instance = setResponseInterceptor(instance)
	return instance
}

/** "요청" 인터셉터 설정 */
const setRequestInterceptor = (instance: AxiosInstance) => {
	instance.interceptors.request.use(
		(config) => {
			const accessToken = getAccessTokenAtClient()
			if (!isNull(accessToken))
				config.headers.Authorization = `Bearer ${accessToken}`
			// [TODO] 👇 당분간 토큰값 직접입력, 추후에 삭제
			else {
				config.headers.Authorization = "Bearer "
			}
			return config
		},
		(error) => Promise.reject(error),
	)
	return instance
}
/** "응답" 인터셉터 설정 */
const setResponseInterceptor = (instance: AxiosInstance) => {
	instance.interceptors.response.use(
		(response) => response,
		(error) => Promise.reject(error),
	)
	return instance
}
