import { axiosInstance } from "@/config/axios"
import type { TResSubscribe } from "@/hook/use-sse"

export const getNotifications = async (): Promise<Array<TResSubscribe>> => {
	const response = await axiosInstance().get(`/notification/list`)
	return response.data.dataList
}
