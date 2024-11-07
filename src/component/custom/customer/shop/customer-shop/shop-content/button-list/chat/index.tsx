import type { FormEvent, KeyboardEvent } from "react"
import { useEffect, useState } from "react"

import NTIcon from "@/component/common/nt-icon"
import { cn } from "@/config/tailwind"
import { getNowStamp } from "@/util/common"

import type { TChatMessage } from "../../../../../../../../hook/use-chat"
import { useChat } from "../../../../../../../../hook/use-chat"

import ChatButton from "./chat-btn"
import ChatMessage from "./chat-message"
import InitMessage from "./init-message"

type ChatPT = {
	shopId: number
}

export default function Chat({ shopId }: ChatPT) {
	// 입력된 message 관리 state
	const [message, setMessage] = useState<TChatMessage>({
		message: "",
		timeStamp: getNowStamp(),
		isSender: true,
	})
	// 채팅창관리 state
	const [isOpen, setIsOpen] = useState(false)
	const { chatRoomInfo, messageArr, setMessageArr, stompClient } =
		useChat(shopId)

	// chat message 전송 handler 함수
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

	// 버튼 클릭 시 메시지 전송
	const handleSendMessage = (msg: string) => {
		sendMessage({
			chatRommId: chatRoomInfo?.chatRoomId as number,
			msg: msg,
			shopId: shopId,
			memberId: chatRoomInfo?.memberId as number,
		})
	}
	const onSubmitMessage = (
		e: KeyboardEvent<HTMLTextAreaElement> | FormEvent<HTMLFormElement>,
	) => {
		e.preventDefault()
		handleSendMessage(message.message)
		setMessageArr((prevArr) => [...prevArr, message])
		setMessage({
			message: "",
			isSender: true,
			timeStamp: getNowStamp(),
		})
	}

	useEffect(() => {
		if (isOpen) stompClient.activate()
		return () => {
			stompClient.deactivate()
		}
	}, [isOpen, stompClient])

	return (
		<div>
			<ChatButton isOpen={isOpen} setIsOpen={setIsOpen} />
			<form
				onSubmit={onSubmitMessage}
				className={cn(
					"scrollbar-none fixed bottom-3 right-32 z-30 flex h-fit w-[25rem] flex-col justify-between overflow-auto rounded-xl border border-Gray20 bg-White shadow-customGray80 transition-all lg:right-2 xl:right-7 max-md:right-1/2 max-md:w-[95%] max-md:translate-x-1/2",
					isOpen ? "h-[35rem]" : "h-0 border-none",
				)}
			>
				<div className="flex h-[3rem] w-full items-center justify-between rounded-t-xl bg-BGblue02 px-4">
					<NTIcon icon="chat" className="w-8" />
					<button
						type="button"
						onClick={() => {
							if (isOpen) {
								stompClient.deactivate()
								setIsOpen(false)
							}
						}}
						className="pb-1 text-center text-[2rem] text-Black transition-all hover:text-PB110"
					>
						x
					</button>
				</div>
				<div className="scrollbar flex h-[30rem] max-h-[30rem] w-full flex-col gap-y-5 overflow-y-scroll bg-Gray20 p-3">
					{chatRoomInfo && <InitMessage chatRoomInfo={chatRoomInfo} />}
					{messageArr.map(({ isSender, message, timeStamp }, idx) => (
						<ChatMessage
							key={idx}
							isSender={isSender}
							message={message}
							timeStamp={timeStamp}
						/>
					))}
				</div>
				<div className="rounded-b-xl">
					<textarea
						placeholder="메세지 입력"
						className="scrollbar-none h-[5rem] w-full resize-none bg-White px-2 py-4 focus:border-none focus:outline-none max-md:w-full"
						onChange={(e) =>
							setMessage({
								message: e.target.value,
								isSender: true,
								timeStamp: getNowStamp(),
							})
						}
						value={message?.message}
						onKeyUp={(e) => {
							if (e.code === "Enter" && message?.message.trim() !== "") {
								onSubmitMessage(e)
							}
						}}
					/>
					<div className="flex w-full justify-end bg-White px-4 pb-2">
						<button
							className="h-fit w-fit rounded-md bg-PB70 px-4 py-1 text-Callout text-White transition-all hover:bg-PB100 disabled:cursor-default disabled:bg-Gray50"
							disabled={message?.message === ""}
							type="submit"
						>
							전송
						</button>
					</div>
				</div>
			</form>
		</div>
	)
}
