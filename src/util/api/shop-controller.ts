/**
 * @컨트롤러 [Shop Controller]
 * @검샘필터 #숍컨트롤러 #매장컨트롤러 #숍등록 #숍삭제 #숍소개 #숍커버
 * @API명세 https://mobi-projects.github.io/nail-case-server/#api-ShopController
 * @함수목록
 *   - deleteCoverImage()
 *   - deleteShop()
 *   - getShopById()
 *   - getTags()
 *   - postRegisterShop()
 *   - getSearchShop()
 *   - patchUpdateOverview()
 *   - putUpdateShop()
 *   - postUploadImage()
 *   - getListShopNailArtist()
 */

import { axiosInstance } from "@/config/axios"
import type { TResponseData } from "@/type/response"
import type {
	TReqBodyPatchUpdateOverview,
	TReqBodyPostRegisterShop,
	TReqBodyPostUploadImage,
	TReqBodyPutUpdateShop,
	TResGetListShopNailArtist,
	TResGetSearchShop,
	TResGetShopById,
	TResPatchUpdateOverview,
	TResPostRegisterShop,
	TResPutUpdateShop,
} from "@/type/shop"

/** [DELETE] 숍 커버(이미지) 삭제 api 호출 */
export const deleteCoverImage = async (imageId: number) => {
	const response = await axiosInstance().delete(`/shops/image/${imageId}`)
	return response.data
}
/** [DELETE] 등록된 숍 삭제 api 호출 */
export const deleteShop = async (shopId: number) => {
	const response = await axiosInstance().delete(`/shops/${shopId}`)
	return response
}
/** [GET] 매장 정보 조회 api 호출 */
export const getShopById = async (
	shopId: number,
): Promise<TResponseData<TResGetShopById, "data">> => {
	const response = await axiosInstance().get(`/shops/${shopId}`)
	return response.data
}
/** [GET] 모든 해쉬태그 불러오기 */
export const getTags = async () => {
	const response = await axiosInstance().get("/shops/tags")
	return response.data
}
/** [POST] 새 매장 등록 */
export const postRegisterShop = async (
	reqBody: TReqBodyPostRegisterShop,
): Promise<TResponseData<TResPostRegisterShop, "data">> => {
	const response = await axiosInstance().post("/shops", reqBody)
	return response.data
}
/** [GET] 매장 검색 */
export const getSearchShop = async (
	keyword: string,
	page: number,
): Promise<TResponseData<TResGetSearchShop, "data">> => {
	const response = await axiosInstance().get(`/shops/search/${keyword}`, {
		params: { page },
	})
	return response.data
}
/** [PATCH] 소개글 갱신 */
export const patchUpdateOverview = async (
	shopId: number,
	reqBody: TReqBodyPatchUpdateOverview,
): Promise<TResponseData<TResPatchUpdateOverview, "data">> => {
	const response = await axiosInstance().patch(
		`/shops/${shopId}/overview`,
		reqBody,
	)
	return response.data
}
/** [PUT] 매장 기본 정보 갱신 */
export const putUpdateShop = async (
	shopId: number,
	reqBody: TReqBodyPutUpdateShop,
): Promise<TResponseData<TResPutUpdateShop, "data">> => {
	const response = await axiosInstance().put(`/shops/${shopId}`, reqBody)
	return response.data
}
/** [POST] 커버이미지 등록 */
export const postUploadImage = async (
	shopId: number,
	reqBody: TReqBodyPostUploadImage,
): Promise<TResponseData<string, "data">> => {
	const response = await axiosInstance().post(`/shops/${shopId}/image`, reqBody)
	return response.data
}
/** [GET] 네일샵 별, 아티스트 목록 조회 api 호출 */
export const getListShopNailArtist = async (
	shopId: number,
): Promise<TResponseData<TResGetListShopNailArtist[], "dataList">> => {
	const response = await axiosInstance().get(`/shops/${shopId}/manager/list`)
	return response.data
}

export const getShopAnnouncement = async (shopId: number) => {
	const response = await axiosInstance().get(`/shops/${shopId}/announcements`)
	return response.data
}

export const getShopMonthlyArt = async (shopId: number) => {
	const response = await axiosInstance().get(`/shops/${shopId}/monthly-art`)
	return response.data
}

export const getShopReview = async (shopId: number) => {
	const response = await axiosInstance().get(`/shops/${shopId}/reviews`)
	return response.data
}
