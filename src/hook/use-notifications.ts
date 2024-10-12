import { useQuery } from "@tanstack/react-query"

import { QUERY_NOTIFICATION_LIST } from "@/constant"
import { getNotifications } from "@/util/api-v2/get-notifications"

export const useGetNotifications = () =>
	useQuery({ queryKey: [QUERY_NOTIFICATION_LIST], queryFn: getNotifications })
