import type { AxiosResponse } from "axios"
import axios from "axios"
import { getCookie, hasCookie } from "cookies-next"

import { axiosInstance } from "@/config/axios"
import { ACCESS_TOKEN, REFRESH_TOKEN } from "@/constant/auth-key"
import type { TRefreshDataResponse, TUserInfo } from "@/type"
import type { TResponseData } from "@/type/response"
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
export const postResquestNewToken = async (): Promise<
	AxiosResponse<TRefreshDataResponse>
> => {
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
	const accessToken = hasCookie(ACCESS_TOKEN)
		? getCookie(ACCESS_TOKEN)
		: "no accessToken"

	const refreshToken = getCookie(REFRESH_TOKEN)

	const response = await axios.post(
		`${process.env.NEXT_PUBLIC_BACKEND_APP}/auth/logout`,
		{},
		{
			headers: {
				Authorization: `Bearer ${accessToken}`,
				"Refresh-Token": `Bearer ${refreshToken}`, // Refresh Token (Header로 보내야 함)
			},
		},
	)
	return response
}

/** [GET] 유저정보 조회 요청 api 호출 */
export const getUserInfo = async (): Promise<
	TResponseData<TUserInfo, "data">
> => {
	const response = await axiosInstance().get("/users/info")
	return response.data
}
