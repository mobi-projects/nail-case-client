import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { setCookie } from "cookies-next"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

import {
	QUERY_LIST_SHOP_NAIL_ARTIST,
	QUERY_REVIEW_ARR,
	QUERY_SHOP_INFO,
	QUERY_SHOP_INFO_QUERY,
} from "@/constant"
import { COMMON_HOME, MANAGER_BASE } from "@/constant/routing-path"
import {
	getListShopNailArtist,
	getShopReview,
} from "@/util/api/shop-controller"
import { getShopById } from "@/util/api-v2/get-shop-by-id"
import { getShopInfo } from "@/util/api-v2/get-shop-info"
import { postShopToggleLiked } from "@/util/api-v2/patch-shop-liked"
import { postRegisterShop } from "@/util/api-v2/post-register-shop"
import { deleteAllCookies } from "@/util/common/auth"

/** 매장 아티스트 목록조회 */
export const useListShopNailArtist = (shopId: number) =>
	useQuery({
		queryKey: [QUERY_LIST_SHOP_NAIL_ARTIST, shopId],
		queryFn: async () => await getListShopNailArtist(shopId),
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
		onSuccess: ({ data }) => {
			toast.success("매장이 정상적으로 등록되었습니다.")
			setCookie("shopId", data.shopIds[0])
			router.replace(`${MANAGER_BASE}/${data.shopIds[0]}`)
		},
		onError: () => {
			toast.error("매장 등록에 실패했습니다. 다시 로그인해주세요.")
			deleteAllCookies()
			setTimeout(() => (window.location.href = COMMON_HOME), 1000)
		},
	})
}
export const useShopInfo = (shopId: number) =>
	useQuery({
		queryKey: [QUERY_SHOP_INFO_QUERY, shopId],
		queryFn: async () => await getShopInfo(shopId),
	})

export const useShopById = (shopId: number) =>
	useQuery({
		queryKey: [QUERY_SHOP_INFO, shopId],
		queryFn: async () => await getShopById(shopId),
	})

export const useShopToggleLiked = (shopId: number) => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: async () => await postShopToggleLiked(shopId),

		onMutate: async () => {
			await queryClient.cancelQueries({
				queryKey: [QUERY_SHOP_INFO, shopId],
			})

			const previousShopLiked = queryClient.getQueryData<boolean>([
				QUERY_SHOP_INFO,
				shopId,
			])

			queryClient.setQueryData(
				[QUERY_SHOP_INFO, shopId],
				(prevData: { likedByUser: boolean }) => {
					return {
						...prevData,
						likedByUser: !prevData.likedByUser,
					}
				},
			)

			return { previousShopLiked }
		},

		onError: async (err, variables, context) => {
			if (context?.previousShopLiked) {
				setTimeout(async () => {
					await queryClient.setQueryData(
						[QUERY_SHOP_INFO, shopId],
						context.previousShopLiked,
					)
				}, 2000)
			}
		},

		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: [QUERY_SHOP_INFO, shopId],
			})
		},
	})
}
