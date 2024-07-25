import { axiosInstance } from "@/config/axios"
import { createPostArr, createReservationArr, tmpFetch } from "@/mock"
import type { TResGetMainPageHaveToken } from "@/type/main-page"
import type { TPost } from "@/type/post"
import type { TReservation } from "@/type/reservation"
import type { TResponseData } from "@/type/response"

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
export const getMainPageData = async (): Promise<
	TResponseData<TResGetMainPageHaveToken, "data">
> => {
	const response = await axiosInstance().get("/main", {})
	return response.data
}
