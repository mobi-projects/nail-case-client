import { useMutation, useQuery } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

import {
	QUERY_LIST_SHOP_NAIL_ARTIST,
	QUERY_REVIEW_ARR,
	QUERY_SHOP_INFO,
	QUERY_SHOP_INFO_QUERY,
} from "@/constant"
import { MANAGER_BASE_HOME } from "@/constant/routing-path"
import {
	getListShopNailArtist,
	getShopById,
	getShopReview,
	postRegisterShop,
} from "@/util/api/shop-controller"
import { getShopInfo } from "@/util/api_v2/get-shop-Info"

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

export const useRegisterShop = () => {
	const router = useRouter()
	return useMutation({
		mutationFn: ({ reqForm }: { reqForm: FormData }) =>
			postRegisterShop(reqForm),
		onSuccess: () => {
			toast.success("매장이 정상적으로 등록되었습니다.")
			router.replace(MANAGER_BASE_HOME)
		},
	})
}
export const useShopInfo = (shopId: number) =>
	useQuery({
		queryKey: [QUERY_SHOP_INFO_QUERY, shopId],
		queryFn: async () => await getShopInfo(shopId),
	})
