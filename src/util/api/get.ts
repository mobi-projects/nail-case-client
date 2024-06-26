import {
	createPostArr,
	createReservationArr,
	createShopInfo,
	tmpFetch,
} from "@/mock"
import type { TShopInfo } from "@/type"
import type { TPost } from "@/type/post"
import type { TReservation } from "@/type/reservation"

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
