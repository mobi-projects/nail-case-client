import { type FormEvent, type KeyboardEvent, useState } from "react"

import { type TChatMessage, useManagerChatMessage } from "@/hook/use-chat"
import type { ResGetRoomInfo } from "@/util/api/get-room-list"
import { getNowStamp } from "@/util/common"

import ChatHeader from "./chat-header"
import MessageInput from "./message-input"
import MessageList from "./message-list"

type ChatBoxPT = {
	chatRoomInfo: ResGetRoomInfo
}

export default function ChatBox({ chatRoomInfo }: ChatBoxPT) {
	const { messageArr, messageEndRef, setMessageArr, stompClient } =
		useManagerChatMessage(chatRoomInfo)
	const [message, setMessage] = useState<TChatMessage>({
		message: "",
		timeStamp: getNowStamp(),
		sentByShop: false,
	})
	if (!chatRoomInfo) return null
	const initMessage = () => {
		setMessage({
			message: "",
			sentByShop: true,
			timeStamp: getNowStamp(),
		})
	}
	const onSubmitMessage = (
		e: KeyboardEvent<HTMLTextAreaElement> | FormEvent<HTMLFormElement>,
	) => {
		e.preventDefault()
		sendMessage({
			chatRommId: chatRoomInfo.chatRoomId,
			msg: message.message,
			shopId: chatRoomInfo.shopId,
			memberId: chatRoomInfo.memberId,
		})
		setMessageArr((prevArr) => [...prevArr, message])
		initMessage()
	}
	const sendMessage = ({
		msg,
		shopId,
		chatRommId,
		memberId,
	}: {
		msg: string
		shopId: number
		chatRommId: number
		memberId: number
	}) => {
		if (stompClient.connected) {
			stompClient.publish({
				destination: "/pub/chat/message",
				body: JSON.stringify({
					shopId: shopId,
					chatRoomId: chatRommId,
					memberId: memberId,
					shopMessage: true,
					message: msg,
				}),
			})
		} else {
			console.error("STOMP 클라이언트가 연결되어 있지 않습니다.")
		}
	}

	return (
		<form
			onSubmit={onSubmitMessage}
			className="scrollbar-none flex h-full w-full flex-col justify-between overflow-auto"
		>
			<ChatHeader chatRoomInfo={chatRoomInfo} />
			<MessageList
				messageArr={messageArr}
				messageEndRef={messageEndRef}
				chatRoomInfo={chatRoomInfo}
			/>
			<MessageInput
				message={message}
				onSubmitMessage={onSubmitMessage}
				setMessage={setMessage}
			/>
		</form>
	)
}
