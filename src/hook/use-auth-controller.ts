import { useMutation, useQuery } from "@tanstack/react-query"
import { setCookie } from "cookies-next"

import { QUERY_USER_IFNO } from "@/constant"
import { COMMON_HOME, MANAGER_BASE } from "@/constant/routing-path"
import type { TSignDataResponse } from "@/type"
import type { TResponseData } from "@/type/response"
import type { TSignType } from "@/type/union-option/sign-type"
import { getLogin } from "@/util/api/auth-controller"
import { getUserInfo } from "@/util/api-v2/get-user-info"
import { initAuthTokens } from "@/util/common/auth"

type UseGetAuthTokenPT = { code: string; loginType: TSignType }
// -------------------------tanstack query 함수 -------------------------------------------//
/** 로그인 mutation  */
export const useGetAuthToken = () => {
	const { mutateAsync: getAuthToken, ...rest } = useMutation({
		mutationFn: async ({ code, loginType }: UseGetAuthTokenPT) =>
			await getLogin(code, loginType),
		onSuccess: async ({ data }: TResponseData<TSignDataResponse, "data">) => {
			initAuthTokens(data)
			/** 임시로 쿠키에 저장해서 profileUrl 전달 */
			setCookie("profile-image", encodeURIComponent(data.profileImgUrl), {
				maxAge: 86400,
			})
			console.log(data.shopId)
			routingUser(data)
		},
		onError: (error) => {
			alert("로그인 실패")
			window.location.href = COMMON_HOME
			throw error
		},
	})
	return { getAuthToken, ...rest }
}

/** 유저정보 조회 useQuery  */
export const useGetUserInfo = () =>
	useQuery({
		queryKey: [QUERY_USER_IFNO],
		queryFn: getUserInfo,
	})

///--------------------------  tanstack qeuery에 사용될 일반 함수  ----------------------- //
const routingUser = ({ role, hasShop, shopId }: TSignDataResponse) => {
	if (role === "MEMBER") {
		window.location.href = COMMON_HOME
	} else if (hasShop && role === "MANAGER" && shopId) {
		window.location.href = `${MANAGER_BASE}/${shopId}`
	} else {
		window.location.href = "/manager/register-shop"
	}
}
