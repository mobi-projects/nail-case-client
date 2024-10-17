import axios from "axios"
import { getCookie, hasCookie } from "cookies-next"

import { ACCESS_TOKEN, REFRESH_TOKEN } from "@/constant/auth-key"

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
