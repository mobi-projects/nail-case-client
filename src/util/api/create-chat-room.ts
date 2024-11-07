import { useMutation } from "@tanstack/react-query"

import { axiosInstance } from "@/config/axios"

export const createRoom = async ({
	shopId,
}: ReqCreateRoom): Promise<ResCreateRoom> => {
	const response = await axiosInstance().post(`chat/rooms?shopId=${shopId}`)
	return response.data.data
}

export const useCreateRoom = () =>
	useMutation({
		mutationKey: ["create-room"],
		mutationFn: (reqBody: { shopId: number }) => createRoom(reqBody),
	})

export type ReqCreateRoom = { shopId: number }

export type ResCreateRoom = {
	chatRoomId: number
	createdAt: number
	lastMessage: string | null
	lastMessageTime: number | null
	memberId: number
	name: string
	shopId: number
	unreadCount: number
}
