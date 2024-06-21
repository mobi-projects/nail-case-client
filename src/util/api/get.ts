import { axiosInstance } from "@/config/axios"
import {
	createPostArr,
	createReservationArr,
	createShopInfo,
	tmpFetch,
} from "@/mook"
import type { TShopInfo } from "@/type"
import type { TPost } from "@/type/post"
import type { TReservation, TReservationV2 } from "@/type/reservation"
import type { TResponseData } from "@/type/response"

export const getShopInfo = async () => {
	const response = await tmpFetch<TShopInfo>(createShopInfo()) // TODO: fetching 함수 교체 필요
	return response
}
export const getReservationArr = async (from: number, to: number) => {
	const response = await tmpFetch<TReservation[]>(
		createReservationArr(from, to),
	) // TODO: fetching 함수 교체 필요
	return response
}
export const getPostArr = async () => {
	const response = await tmpFetch<TPost[]>(createPostArr()) // TODO: fetching 함수 교체 필요
	return response
}
/* [Reservation Controller] */
export const getListReservation = async (
	shopId: number,
	startTime: number,
	endTime: number,
): Promise<TResponseData<TReservationV2, "dataList">> => {
	const response = await axiosInstance().get(`/shops/${shopId}/reservations`, {
		params: { startTime, endTime },
	})
	return response.data
}
