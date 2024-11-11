import { useEffect, useState } from "react"

import type { ResCreateRoom } from "@/util/api/create-chat-room"
import { useCreateRoom } from "@/util/api/create-chat-room"

import ChatBox from "./chat-box"
import ChatBoxError from "./chat-box/chat-box-error"
import StartChatBtn from "./start-chat-btn"

type ChatPT = {
	shopId: number
}

export default function Chat({ shopId }: ChatPT) {
	const [isOpen, setIsOpen] = useState(false)
	const [chatRoomInfo, setChatRoomInfo] = useState<ResCreateRoom>()
	const { mutateAsync } = useCreateRoom()
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

	return (
		<>
			<StartChatBtn isOpen={isOpen} setIsOpen={setIsOpen} />
			{chatRoomInfo ? (
				<ChatBox
					chatRoomInfo={chatRoomInfo}
					isOpen={isOpen}
					setIsOpen={setIsOpen}
				/>
			) : (
				<ChatBoxError isOpen={isOpen} setIsOpen={setIsOpen} />
			)}
		</>
	)
}
