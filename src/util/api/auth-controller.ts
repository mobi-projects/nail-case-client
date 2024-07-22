import axios from "axios"
import { getCookie } from "cookies-next"

import { axiosInstance } from "@/config/axios"
import { REFRESH_TOKEN } from "@/constant/auth-key"
import type { TSignType } from "@/type/union-option/sign-type"

/** [GET] 로그인 요청 api 호출 */
export const getLogin = async (code: string, loginType: TSignType) => {
	try {
		const response = await axios.get(
			`${process.env.NEXT_PUBLIC_BACKEND_APP}/auth/${loginType}/kakao`,
			{
				params: { code },
			},
		)
		return response.data
	} catch (error) {
		throw error
	}
}

/** [POST] 리프레쉬 토큰 api 호출 */
export const postResquestNewToken = async () => {
	const refreshToken = getCookie(REFRESH_TOKEN)

	const response = await axios.post(
		`${process.env.NEXT_PUBLIC_BACKEND_APP}/auth/refresh`,
		{},
		{
			headers: {
				"Refresh-Token": `Bearer ${refreshToken}`,
			},
		},
	)
	return response
}

/** [POST] 로그아웃 요청 api 호출 */
export const postLogout = async () => {
	const refreshToken = getCookie(REFRESH_TOKEN)

	const response = await axiosInstance().post(
		`/auth/logout`,
		{},
		{
			headers: {
				"Refresh-Token": `Bearer ${refreshToken}`, // Refresh Token (Header로 보내야 함)
			},
		},
	)
	return response
}
