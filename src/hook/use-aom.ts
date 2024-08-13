import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"

import { useModal } from "@/component/common/nt-modal/nt-modal.context"
import { QUERY_MONTHLY_ART_ARR } from "@/constant"
import { getMonthlyArtList } from "@/util/api-v2/list-monthly-art"
import { putUpdateAomImages } from "@/util/api-v2/update-images"
/** AOM 목록조회 */
export const useGetMonthlyArtList = (shopId: number) =>
	useQuery({
		queryKey: [QUERY_MONTHLY_ART_ARR, shopId],
		queryFn: () => getMonthlyArtList(shopId),
	})

export const useMutateAOM = () => {
	const queryClient = useQueryClient()
	const { onCloseModal } = useModal()
	return useMutation({
		mutationFn: ({
			formData,
			shopId,
		}: {
			shopId: number
			formData: FormData
		}) => putUpdateAomImages(shopId, formData),
		onSuccess: (data, variables) => {
			queryClient.invalidateQueries({
				queryKey: [QUERY_MONTHLY_ART_ARR, variables.shopId],
			})
		},
		onError: () => {
			return toast.error("이달의 아트 등록에 실패했습니다.")
		},
		onSettled: () => {
			onCloseModal()
		},
	})
}
