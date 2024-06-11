import { createReservationArr, createShopInfo, tmpFetch } from "@/mook"
import type { TShopInfo } from "@/type"
import type { TReservation } from "@/type/reservation"

export const getShopInfo = async () => {
	const response = await tmpFetch<TShopInfo>(createShopInfo()) // TODO: fetching 함수 교체 필요
	return response
}
export const getReservationArr = async () => {
	const response = await tmpFetch<TReservation[]>(createReservationArr()) // TODO: fetching 함수 교체 필요
	console.log(response)
	return response
}
