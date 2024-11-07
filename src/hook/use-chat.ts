import { Client } from "@stomp/stompjs"
import { getCookie } from "cookies-next"
import { useEffect, useMemo, useState } from "react"
import SockJS from "sockjs-client"

import { ACCESS_TOKEN } from "@/constant/auth-key"
import type { ResCreateRoom } from "@/util/api/create-chat-room"
import { useCreateRoom } from "@/util/api/create-chat-room"

export const useChat = (shopId: number) => {
	// 전체 채팅 message Arr state
	const [messageArr, setMessageArr] = useState<Array<TChatMessage>>([])

	// 채팅방 정보 state
	const [chatRoomInfo, setChatRoomInfo] = useState<ResCreateRoom>()

	const { mutateAsync } = useCreateRoom()

	const stompClient = useMemo(() => {
		const socketUrl = `http://15.165.15.0/api/v1/chat/inbox`
		const token = getCookie(ACCESS_TOKEN)
		return new Client({
			webSocketFactory: () => new SockJS(socketUrl),

			connectHeaders: {
				Authorization: `Bearer ${token}`,
			},

			// 응답메세지 타입

			// 연결 성공 시 호출되는 함수
			onConnect: () => {
				// 서버에서 메시지 수신 대기 (구독)
				stompClient.subscribe(
					`/exchange/chat.exchange/chat.${chatRoomInfo?.chatRoomId}`,
					(message) => {
						const response = message.body

						const newMessage: ResMessage = JSON.parse(response)
						console.log(newMessage)
						if (newMessage.sentByShop) {
							setMessageArr((prevArr) => [
								...prevArr,
								{
									message: newMessage.message,
									isSender: false,
									timeStamp: newMessage.createdAt,
								},
							])
						}
					},
					{ Authorization: `Bearer ${token}` },
				)
			},

			onStompError: (frame) => {
				console.error("STOMP error:", frame)
			},
		})
	}, [chatRoomInfo])

	useEffect(() => {
		const initializeChatRoomInfo = async () => {
			try {
				const response = await mutateAsync({
					shopId: shopId,
				})
				setChatRoomInfo(response)
			} catch (error) {
				console.error("채팅방 정보를 가져오는 중 오류 발생:", error)
			}
		}
		initializeChatRoomInfo()
	}, [shopId, mutateAsync])
	return { messageArr, setMessageArr, chatRoomInfo, stompClient }
}

export type TChatMessage = {
	message: string
	timeStamp: number
	isSender: boolean
}

export type ResMessage = {
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
