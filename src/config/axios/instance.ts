import type { AxiosInstance, AxiosRequestConfig } from "axios"
import axios from "axios"

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
			// TODO: 당분간 각자의 토큰 직접 입력
			config.headers.Authorization =
				"Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJBY2Nlc3NUb2tlbiIsImV4cCI6OTIzMzczNzU1NzQ5ODczLCJlbWFpbCI6IjQ3NjQzZDI1LWJhMjctNGY4Mi05OWJjLWE2YTI1ODI4YzBkNUBzb2NpYWxVc2VyLmNvbSIsIm1lbWJlcklkIjoyMn0.ygMauAZ0TyIen6ojT9wn88xtt0hbDCOOBvuZN-0sBISxQUOp_zui4Eojfh0IacdPOMVtrWPr3ivF9IqjjcMe7Q"
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
		(error) => Promise.reject(error),
	)
	return instance
}
