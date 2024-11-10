import {
	type Dispatch,
	type FormEvent,
	type KeyboardEvent,
	type SetStateAction,
	useEffect,
	useState,
} from "react"

import { cn } from "@/config/tailwind"
import { type TChatMessage, useChatMessage } from "@/hook/use-chat"
import type { ResCreateRoom } from "@/util/api/create-chat-room"
import { getNowStamp } from "@/util/common"

import ChatHeader from "./chat-header"
import MessageInput from "./message-input"
import MessageList from "./message-list"

type ChatBoxPT = {
	isOpen: boolean
	setIsOpen: Dispatch<SetStateAction<boolean>>
	shopId: number
	chatRoomInfo: ResCreateRoom
}

export default function ChatBox({
	isOpen,
	chatRoomInfo,
	shopId,
	setIsOpen,
}: ChatBoxPT) {
	const nowStamp = getNowStamp()
	const { messageArr, messageEndRef, setMessageArr, stompClient } =
		useChatMessage(chatRoomInfo)
	const [message, setMessage] = useState<TChatMessage>({
		message: "",
		timeStamp: getNowStamp(),
		sentByShop: false,
	})

	const handleCloseChat = () => {
		if (isOpen) {
			stompClient.deactivate()
			setIsOpen(false)
		}
		initMessage()
	}

	const initMessage = () => {
		setMessage({
			message: "",
			sentByShop: false,
			timeStamp: nowStamp,
		})
	}

	const onSubmitMessage = (
		e: KeyboardEvent<HTMLTextAreaElement> | FormEvent<HTMLFormElement>,
	) => {
		e.preventDefault()
		sendMessage({
			chatRommId: chatRoomInfo.chatRoomId,
			msg: message.message,
			shopId: shopId,
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
					shopMessage: false,
					message: msg,
				}),
			})
		} else {
			console.error("STOMP 클라이언트가 연결되어 있지 않습니다.")
		}
	}

	useEffect(() => {
		if (isOpen) stompClient.activate()
		return () => {
			stompClient.deactivate()
		}
	}, [isOpen, stompClient])

	return (
		<form
			onSubmit={onSubmitMessage}
			className={cn(
				"scrollbar-none fixed bottom-3 right-32 z-30 flex h-fit w-[25rem] flex-col justify-between overflow-auto rounded-xl border border-Gray20 bg-White shadow-customGray80 transition-all lg:right-2 xl:right-7 max-md:right-1/2 max-md:w-[95%] max-md:translate-x-1/2",
				isOpen ? "h-[35rem]" : "h-0 border-none",
			)}
		>
			<ChatHeader handleCloseChat={handleCloseChat} />
			<MessageList
				messageEndRef={messageEndRef}
				messageArr={messageArr}
				chatRoomInfo={chatRoomInfo}
			/>
			<MessageInput
				message={message}
				setMessage={setMessage}
				onSubmitMessage={onSubmitMessage}
			/>
		</form>
	)
}
