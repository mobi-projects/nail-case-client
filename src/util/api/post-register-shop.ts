import { axiosInstance } from "@/config/axios"
import type { TResponseData } from "@/type/response"

export const postRegisterShop = async (
	formData: FormData,
): Promise<TResponseData<TResRegisterShop, "data">> => {
	const response = await axiosInstance("multipart/form-data").post(
		"/shops",
		formData,
	)
	return response.data
}

export type TResRegisterShop = {
	hasShop: boolean
	shopIds: Array<number>
}
