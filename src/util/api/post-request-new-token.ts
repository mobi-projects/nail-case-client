import axios, { type AxiosResponse } from "axios"
import { getCookie } from "cookies-next"

import { REFRESH_TOKEN } from "@/constant/auth-key"
import type { TRefreshDataResponse } from "@/type"

/** [POST] 리프레쉬 토큰 api 호출 */
export const postRequestNewToken = async (): Promise<
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
