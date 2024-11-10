import NTLoadingSpinner from "@/component/common/nt-loading-spinner"
import { usePrevChat } from "@/hook/use-chat"
import type { ResCreateRoom } from "@/util/api/create-chat-room"
import { isUndefined } from "@/util/common/type-guard"

import ChatMessage from "../chat-message"

type PrevChatMessageListPT = {
	chatRoomInfo: ResCreateRoom
}

export default function PrevChatMessageList({
	chatRoomInfo,
}: PrevChatMessageListPT) {
	const { data, isLoading, isError } = usePrevChat({
		roomId: chatRoomInfo.chatRoomId,
	})

	if (isLoading) return <ChatSpinner />
	if (isError || isUndefined(data)) return <PrevChatLoadError />
	const prevChat = data.chatMessageList
	if (prevChat.length === 0) return <StartChatPrompt />
	return (
		<>
			{prevChat
				.map(({ message, createdAt, sentByShop, chatMessageId }) => (
					<ChatMessage
						message={message}
						timeStamp={createdAt}
						sentByShop={sentByShop}
						key={chatMessageId}
					/>
				))
				.reverse()}
		</>
	)
}

function ChatSpinner() {
	return (
		<div className="relative flex h-full w-full items-center justify-center">
			<div className="absolute z-20 h-6 w-6 rounded-full ring-4 ring-White/40" />
			<NTLoadingSpinner size="small" />
		</div>
	)
}

function StartChatPrompt() {
	return (
		<p className="w-full text-center font-SemiBold text-Gray70">
			대화를 시작해 주세요.
		</p>
	)
}

function PrevChatLoadError() {
	return (
		<p className="flex w-full items-center justify-center">
			이전 대화를 불러오지 못했습니다.
		</p>
	)
}
