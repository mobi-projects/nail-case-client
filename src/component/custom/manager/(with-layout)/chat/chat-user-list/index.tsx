import type { Dispatch, SetStateAction } from "react"

import type { ResGetRoomInfo } from "@/util/api/get-room-list"

import ChatUser from "./chat-user"

type ChatUserListPT = {
	chatRoomArr: Array<ResGetRoomInfo>
	selectedChatRoomId: number
	setSelectedChatRoomId: Dispatch<SetStateAction<number>>
}

export default function ChatUserList({
	chatRoomArr,
	setSelectedChatRoomId,
	selectedChatRoomId,
}: ChatUserListPT) {
	return (
		<div className="scrollbar h-[80dvh] w-full overflow-y-auto border">
			{chatRoomArr.map((roomInfo) => (
				<ChatUser
					key={roomInfo.chatRoomId}
					chatRoomInfo={roomInfo}
					isSelected={selectedChatRoomId === roomInfo.chatRoomId}
					setSelectedChatRoomId={setSelectedChatRoomId}
				/>
			))}
		</div>
	)
}
