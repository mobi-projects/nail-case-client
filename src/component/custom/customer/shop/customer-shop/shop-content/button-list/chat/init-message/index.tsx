import type { ResCreateRoom } from "@/util/api/create-chat-room"

import ChatMessage from "../chat-message"

type DefaultMessagePT = { chatRoomInfo: ResCreateRoom }

export default function InitMessage({ chatRoomInfo }: DefaultMessagePT) {
	const { lastMessage, lastMessageTime } = chatRoomInfo
	return lastMessage && lastMessageTime ? (
		<ChatMessage message={lastMessage} timeStamp={lastMessageTime} />
	) : (
		<div className="text-Body01 text-Black">대화를 시작해 주세요.</div>
	)
}
