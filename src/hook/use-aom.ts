import { useQuery } from "@tanstack/react-query"

import { QUERY_MONTHLY_ART_ARR } from "@/constant"
import { getMonthlyArtList } from "@/util/api-v2/list-monthly-art"
/** AOM 목록조회 */
export const useGetMonthlyArtList = (shopId: number) =>
	useQuery({
		queryKey: [QUERY_MONTHLY_ART_ARR, shopId],
		queryFn: () => getMonthlyArtList(shopId),
	})
