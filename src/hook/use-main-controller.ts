import { useQuery } from "@tanstack/react-query"

import { QUERY_MAINPAGE_QUERY } from "@/constant"
import { getMainPageData } from "@/util/api/get"
/*로그인시 메인페이지 데이터 */
export const useGetMainPageDataQuery = () =>
	useQuery({
		queryKey: [QUERY_MAINPAGE_QUERY],
		queryFn: async () => await getMainPageData(),
	})
