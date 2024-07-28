import { useMutation, useQuery } from "@tanstack/react-query"

import {
	QUERY_LIST_SHOP_NAIL_ARTIST,
	QUERY_REVIEW_ARR,
	QUERY_SHOP_INFO,
} from "@/constant"
import {
	getListShopNailArtist,
	getShopById,
	getShopReview,
	postRegisterShop,
} from "@/util/api/shop-controller"

/** 매장 아티스트 목록조회 */
export const useListShopNailArtist = (shopId: number) =>
	useQuery({
		queryKey: [QUERY_LIST_SHOP_NAIL_ARTIST, shopId],
		queryFn: async () => await getListShopNailArtist(shopId),
	})

export const useShopById = (shopId: number) =>
	useQuery({
		queryKey: [QUERY_SHOP_INFO, shopId],
		queryFn: async () => await getShopById(shopId),
	})

export const useShopReviews = (shopId: number) =>
	useQuery({
		queryKey: [QUERY_REVIEW_ARR, shopId],
		queryFn: () => getShopReview(shopId!),
	})

export const useRegisterShop = () =>
	useMutation({
		mutationFn: ({ reqForm }: { reqForm: FormData }) =>
			postRegisterShop(reqForm),
	})
