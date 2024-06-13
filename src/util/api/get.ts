import {
	createPostArr,
	createReservationArr,
	createShopInfo,
	tmpFetch,
} from "@/mook"
import type { TShopInfo } from "@/type"
import type { TPost } from "@/type/post"
import type { TReservation } from "@/type/reservation"

export const getShopInfo = async () => {
	const response = await tmpFetch<TShopInfo>(createShopInfo()) // TODO: fetching 함수 교체 필요
	return response
}
export const getReservationArr = async () => {
	const response = await tmpFetch<TReservation[]>(createReservationArr()) // TODO: fetching 함수 교체 필요
	return response
}
export const getPostArr = async () => {
	const response = await tmpFetch<TPost[]>(createPostArr()) // TODO: fetching 함수 교체 필요
	return response
}
