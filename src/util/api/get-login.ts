import axios from "axios"

import type { TSignType } from "@/type/union-option/sign-type"

/** [GET] 로그인 요청 api 호출 */
export const getLogin = async (code: string, loginType: TSignType) => {
	try {
		const response = await axios.get(
			`${process.env.NEXT_PUBLIC_BACKEND_APP}/auth/${loginType}/kakao`,
			{
				headers: {
					"ngrok-skip-browser-warning": "true",
				},
				params: { code },
			},
		)
		return response.data
	} catch (error) {
		throw error
	}
}
