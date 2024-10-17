import { useMutation, useQuery } from "@tanstack/react-query"

import { QUERY_USER_IFNO } from "@/constant"
import { COMMON_HOME, MANAGER_BASE } from "@/constant/routing-path"
import type { TSignDataResponse } from "@/type"
import type { TResponseData } from "@/type/response"
import type { TSignType } from "@/type/union-option/sign-type"
import { getLogin } from "@/util/api/get-login"
import { getUserInfo } from "@/util/api/get-user-info"
import { initAuthTokens } from "@/util/common/auth"

type UseGetAuthTokenPT = { code: string; loginType: TSignType }
// -------------------------tanstack query 함수 -------------------------------------------//
/** 로그인 mutation  */
export const useGetAuthToken = () => {
	return useMutation({
		mutationFn: async ({ code, loginType }: UseGetAuthTokenPT) =>
			await getLogin(code, loginType),
		onSuccess: async ({ data }: TResponseData<TSignDataResponse, "data">) => {
			initAuthTokens(data)
			routingUser(data)
		},
		onError: (error) => {
			alert("로그인 실패")
			window.location.href = COMMON_HOME
			throw error
		},
	})
}

/** 유저정보 조회 useQuery  */
export const useGetUserInfo = (type: "MANAGER" | "MEMBER") =>
	useQuery({
		queryKey: [QUERY_USER_IFNO, type],
		queryFn: getUserInfo,
	})

///--------------------------  tanstack qeuery에 사용될 일반 함수  ----------------------- //
const routingUser = ({ role, hasShop, shopIds }: TSignDataResponse) => {
	if (role === "MEMBER") {
		window.location.href = COMMON_HOME
	} else if (hasShop) {
		window.location.href = `${MANAGER_BASE}/${shopIds[0]}`
	} else {
		window.location.href = "/manager/register-shop"
	}
}
