"use client"

import { useState } from "react"

import NTIcon from "@/component/common/nt-icon"
import NTLoadingSpinner from "@/component/common/nt-loading-spinner"
import ChatBox from "@/component/custom/manager/(with-layout)/chat/chat-box"
import ChatUserList from "@/component/custom/manager/(with-layout)/chat/chat-user-list"
import { useGetRoomList } from "@/hook/use-chat"
import { isUndefined } from "@/util/common/type-guard"

type ChatPT = {
	params: { shopId: string }
}

export default function Chat({ params }: ChatPT) {
	const shopId = parseInt(params.shopId)

	const [selectedChatRoomId, setSelectedChatRoomId] = useState(-1)
	const [isSideBarOpen, setIsSideBarOpen] = useState(true)
	const { data, isLoading, isError } = useGetRoomList(shopId)

	if (isLoading) return <ChatLoading />
	if (isError || isUndefined(data)) return <ChatError />
	if (data.length === 0) return <EmptyChatList />
	const selectedChatRoom =
		data[data.findIndex((info) => info.chatRoomId === selectedChatRoomId)]
	const isSelected = selectedChatRoomId !== -1
	return (
		<div className="flex h-full w-full items-center justify-center lg:px-3 xl:px-3 max-md:px-2">
			<div className="relative mt-4 grid h-[80dvh] w-full grid-cols-[1fr_2fr] rounded-lg bg-White shadow-customGray80 max-xl:flex max-xl:h-[86dvh]">
				<ChatUserList
					chatRoomArr={data}
					selectedChatRoomId={selectedChatRoomId}
					setSelectedChatRoomId={setSelectedChatRoomId}
					isSideBarOpen={isSideBarOpen}
					setIsSideBarOpen={setIsSideBarOpen}
				/>
				{isSelected ? (
					<ChatBox chatRoomInfo={selectedChatRoom} />
				) : (
					<SelectChatRoomPrompt />
				)}
			</div>
		</div>
	)
}

function SelectChatRoomPrompt() {
	return (
		<div className="flex h-full w-full items-center justify-center">
			<div className="flex flex-col items-center justify-center space-y-2">
				<NTIcon icon="chat" className="h-16 w-16 text-Gray40" />
				<p className="text-Title01 font-Bold text-Gray70">
					대화방을 선택해 주세요.
				</p>
			</div>
		</div>
	)
}

function EmptyChatList() {
	return (
		<div className="flex h-full w-full items-center justify-center lg:px-3 xl:px-3 max-md:px-1">
			<div className="grid h-[80dvh] w-full grid-cols-[1fr_2fr] rounded-lg bg-White shadow-customGray80">
				<div className="flex h-full w-full border" />
				<div className="flex h-full w-full items-center justify-center text-Title01 font-Bold text-Gray70">
					현재 대화 내역이 없습니다.
				</div>
			</div>
		</div>
	)
}

function ChatLoading() {
	return (
		<div className="flex h-full w-full items-center justify-center lg:px-3 xl:px-3 max-md:px-1">
			<div className="grid h-[80dvh] w-full grid-cols-[1fr_2fr] rounded-lg bg-White shadow-customGray80">
				<div className="flex h-full w-full border" />
				<div className="flex h-full w-full items-center justify-center text-Title01 font-Bold text-Gray70">
					<NTLoadingSpinner size="medium" />
				</div>
			</div>
		</div>
	)
}

function ChatError() {
	return (
		<div className="flex h-full w-full items-center justify-center lg:px-3 xl:px-3 max-md:px-1">
			<div className="grid h-[80dvh] w-full grid-cols-[1fr_2fr] rounded-lg bg-White shadow-customGray80">
				<div className="flex h-full w-full border" />
				<div className="flex h-full w-full items-center justify-center text-Title01 font-Bold text-Gray70">
					죄송합니다. 오류가 발생해서 대화내역을 불러올 수 없습니다.
				</div>
			</div>
		</div>
	)
}
