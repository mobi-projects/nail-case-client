import type { RefObject } from "react"

import type { TChatMessage } from "@/hook/use-chat"
import type { ResGetRoomInfo } from "@/util/api/get-room-list"

import ChatMessage from "./chat-message"
import PrevChatMessageList from "./prev-chat-message-list"

type MessageListPT = {
	messageEndRef: RefObject<HTMLDivElement>
	messageArr: Array<TChatMessage>
	chatRoomInfo: ResGetRoomInfo
}

export default function MessageList({
	messageArr,
	messageEndRef,
	chatRoomInfo,
}: MessageListPT) {
	return (
		<div className="scrollbar flex h-full w-full flex-col gap-y-5 overflow-y-scroll bg-Gray20 p-3">
			<PrevChatMessageList chatRoomInfo={chatRoomInfo} />
			{messageArr.map(({ sentByShop, message, timeStamp }, idx) => (
				<ChatMessage
					key={idx}
					sentByShop={sentByShop}
					message={message}
					timeStamp={timeStamp}
				/>
			))}
			<div ref={messageEndRef} />
		</div>
	)
}
