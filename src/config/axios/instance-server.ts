import type { AxiosInstance, AxiosRequestConfig } from "axios"
import axios from "axios"
import { getCookie } from "cookies-next"
import { cookies } from "next/headers"

import { ACCESS_TOKEN } from "@/constant/auth-key"

const instanceConfig: AxiosRequestConfig = {
	baseURL: process.env.NEXT_PUBLIC_BACKEND_APP,
	headers: {
		"Content-Type": "application/json",
	},
	withCredentials: true,
}

export const axiosInstanceServer = () => {
	let instance = axios.create(instanceConfig)
	instance = setRequestInterceptor(instance)

	return instance
}

/** "요청" 인터셉터 설정 */
const setRequestInterceptor = (instance: AxiosInstance) => {
	instance.interceptors.request.use(
		(config) => {
			const accessToken = getCookie(ACCESS_TOKEN, { cookies })
			if (accessToken && config.headers) {
				config.headers.Authorization = `Bearer ${accessToken}`
			}
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
