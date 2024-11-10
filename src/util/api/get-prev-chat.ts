import { axiosInstance } from "@/config/axios"

export const getPrevChat = async ({
	roomId,
	page = 0,
	size = 20,
}: ReqGetPrevChat): Promise<ResGetPrevChat> => {
	const response = await axiosInstance().get(
		`chat/rooms/${roomId}/messages?page=${page}&size=${size}`,
	)
	console.log(response.data.data)
	return response.data.data
}

export type ReqGetPrevChat = {
	roomId: number
	page?: number
	size?: number
}

export type ResGetPrevChat = {
	chatMessageList: Array<TPrevChat>
	pageNumber: number
	pageSize: number
	totalElements: number
	totalPages: number
	last: boolean
}

export type TPrevChat = {
	chatMessageId: number
	chatRoomId: number
	memberId: number
	shopId: number
	message: string
	readByMember: boolean
	readByShop: boolean
	sentByShop: boolean
	createdAt: number
	writerNickname: string
}
