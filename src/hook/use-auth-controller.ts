import { useMutation } from "@tanstack/react-query"
import { setCookie } from "cookies-next"

import { ACCESS_TOKEN, REFRESH_TOKEN } from "@/constant/auth-key"
import { COMMON_HOME } from "@/constant/routing-path"
import type { TSignDataResponse } from "@/type"
import type { TResponseData } from "@/type/response"
import type { TSignType } from "@/type/union-option/sign-type"
import { getLogin } from "@/util/api/auth-controller"

type UseGetAuthTokenPT = { code: string; loginType: TSignType }

export const useGetAuthToken = () => {
	const { mutateAsync: getAuthToken, ...rest } = useMutation({
		mutationFn: async ({ code, loginType }: UseGetAuthTokenPT) =>
			await getLogin(code, loginType),
		onSuccess: async ({ data }: TResponseData<TSignDataResponse, "data">) => {
			const {
				accessToken,
				refreshToken,
				accessTokenExpirationTime,
				refreshTokenExpirationTime,
			} = data

			setCookie(ACCESS_TOKEN, accessToken, {
				maxAge: accessTokenExpirationTime,
			})
			setCookie(REFRESH_TOKEN, refreshToken, {
				maxAge: refreshTokenExpirationTime,
			})
		},
		onError: (error) => {
			alert("로그인 실패")
			throw error
		},
		onSettled: () => {
			window.location.href = COMMON_HOME
		},
	})
	return { getAuthToken, ...rest }
}
