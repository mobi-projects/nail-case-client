import { useEffect, useRef } from "react"

import NTLoadingSpinner from "@/component/common/nt-loading-spinner"
import { cn } from "@/config/tailwind"
import { useChatInfiniteScroll } from "@/hook/use-chat"
import type { ResCreateRoom } from "@/util/api/create-chat-room"
import { isUndefined } from "@/util/common/type-guard"

import ChatMessage from "../chat-message"

type PrevChatMessageListPT = {
	chatRoomInfo: ResCreateRoom
}

export default function PrevChatMessageList({
	chatRoomInfo,
}: PrevChatMessageListPT) {
	const {
		data,
		hasNextPage,
		isError,
		isLoading,
		spinnerRef,
		isFetchingNextPage,
		isFetched,
	} = useChatInfiniteScroll({
		roomId: chatRoomInfo.chatRoomId,
		size: 10,
	})
	const recentFetchedMessageRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		if (recentFetchedMessageRef.current) {
			recentFetchedMessageRef.current.scrollIntoView({
				behavior: "instant",
			})
		}
	}, [data, isFetched])

	if (isLoading) return <ChatSpinner />
	if (isError || isUndefined(data)) return <PrevChatLoadError />
	if (data.pages[0].chatMessageList.length === 0) return <StartChatPrompt />

	return (
		<>
			{hasNextPage && (
				<div
					ref={spinnerRef}
					className="flex min-h-[100px] w-full items-center justify-center"
				>
					{isFetchingNextPage && <ChatSpinner />}
				</div>
			)}
			<div
				className={cn("", hasNextPage ? "min-h-[30px]" : "min-h-0")}
				ref={recentFetchedMessageRef}
			/>
			{data.pages
				.map((chat) =>
					chat.chatMessageList
						.map(({ message, createdAt, sentByShop, chatMessageId }) => (
							<ChatMessage
								message={message}
								timeStamp={createdAt}
								sentByShop={sentByShop}
								key={chatMessageId}
							/>
						))
						.reverse(),
				)
				.reverse()}
		</>
	)
}

function ChatSpinner() {
	return (
		<div className="relative flex h-fit w-full items-center justify-center">
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
