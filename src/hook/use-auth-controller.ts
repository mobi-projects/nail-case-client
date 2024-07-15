import { useMutation } from "@tanstack/react-query"

import { COMMON_HOME } from "@/constant/routing-path"
import type { TSignDataResponse } from "@/type"
import type { TResponseData } from "@/type/response"
import type { TSignType } from "@/type/union-option/sign-type"
import { getLogin } from "@/util/api/auth-controller"
import { initAuthTokens } from "@/util/common/auth"

type UseGetAuthTokenPT = { code: string; loginType: TSignType }

export const useGetAuthToken = () => {
	const { mutateAsync: getAuthToken, ...rest } = useMutation({
		mutationFn: async ({ code, loginType }: UseGetAuthTokenPT) =>
			await getLogin(code, loginType),
		onSuccess: async ({ data }: TResponseData<TSignDataResponse, "data">) => {
			initAuthTokens(data)
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
