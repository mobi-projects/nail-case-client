import type { AxiosError, AxiosInstance, AxiosRequestConfig } from "axios"
import axios from "axios"
import { getCookie } from "cookies-next"

import { ACCESS_TOKEN } from "@/constant/auth-key"

import { handleUnauthorized401 } from "./instance.utll"

const instanceConfig: AxiosRequestConfig = {
	baseURL: process.env.NEXT_PUBLIC_BACKEND_APP,
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
			const accessToken = getCookie(ACCESS_TOKEN)
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

/** "응답" 인터셉터 설정 */
const setResponseInterceptor = (instance: AxiosInstance) => {
	instance.interceptors.response.use(
		(response) => response,
		async (error: AxiosError) => {
			const { config, response } = error
			//**********  401 에러 발생 시 실행 *************//
			if (response?.status === 401)
				try {
					return await handleUnauthorized401(config)
				} catch (error) {
					return Promise.reject(error)
				}
		},
	)
	return instance
}
