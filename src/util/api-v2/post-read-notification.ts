import { useMutation } from "@tanstack/react-query"

import { axiosInstance } from "@/config/axios"

export const postReadNotification = async (reqBody: TReqReadNotification) => {
	const response = await axiosInstance().post(`/notification/read`, reqBody)
	return response
}

export type TReqReadNotification = {
	notificationId: number
}

export const useMutateReadNotification = () =>
	useMutation({
		mutationFn: (reqBody: TReqReadNotification) =>
			postReadNotification(reqBody),
	})
