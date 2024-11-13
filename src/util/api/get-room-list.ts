import { axiosInstance } from "@/config/axios"

export const getRoomList = async (
	shopId: number,
): Promise<Array<ResGetRoomInfo>> => {
	const response = await axiosInstance().get(`chat/rooms/shop/${shopId}`)
	return response.data.dataList
}

export type ResGetRoomInfo = {
	chatRoomId: number
	shopId: number
	memberId: number
	name: string
	createdAt: number | null
	lastMessageTime: number | null
	lastMessage: string | null
	unreadCount: number
	isLastMessageFromShop: boolean
}
