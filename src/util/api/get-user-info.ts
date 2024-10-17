import { axiosInstance } from "@/config/axios"
import type { TResponseData } from "@/type/response"

/** [GET] 유저정보 조회 요청 api 호출 */
export const getUserInfo = async (): Promise<
	TResponseData<TResUserInfo, "data">
> => {
	const response = await axiosInstance().get("/users/info")
	return response.data
}

export type TResUserInfo = {
	shopId: number | null
	shopName: string | null
	profileImage: string
	role: "MANAGER" | "MEMBER"
}
