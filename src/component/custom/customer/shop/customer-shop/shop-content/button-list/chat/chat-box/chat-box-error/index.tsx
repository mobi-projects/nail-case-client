import type { Dispatch, SetStateAction } from "react"

import { cn } from "@/config/tailwind"

import ChatHeader from "../chat-header"

type ChatBoxErrorPT = {
	isOpen: boolean
	setIsOpen: Dispatch<SetStateAction<boolean>>
}
export default function ChatBoxError({ isOpen, setIsOpen }: ChatBoxErrorPT) {
	const handleCloseChat = () => {
		if (isOpen) {
			setIsOpen(false)
		}
	}
	return (
		<div
			className={cn(
				"scrollbar-none fixed bottom-3 right-32 z-30 flex h-fit w-[25rem] flex-col justify-between overflow-auto rounded-xl border border-Gray20 bg-White shadow-customGray80 transition-all lg:right-2 xl:right-7 max-md:right-1/2 max-md:w-[95%] max-md:translate-x-1/2",
				isOpen ? "h-[35rem]" : "h-0 border-none",
			)}
		>
			<ChatHeader handleCloseChat={handleCloseChat} />
			<div className="scrollbar flex h-[30rem] max-h-[30rem] w-full flex-col bg-Gray20 p-3">
				<p className="h-full w-full font-SemiBold text-Gray70">
					서버 오류로 채팅을 시작할 수 없습니다. 잠시 후 다시 시도해 주세요.
				</p>
			</div>
			<div className="rounded-b-xl">
				<textarea
					placeholder="메세지 입력"
					className="scrollbar-none h-[5rem] w-full resize-none bg-White px-2 py-4 max-md:w-full"
					disabled={true}
				/>
				<div className="flex w-full justify-end bg-White px-4 pb-2">
					<button
						className="h-fit w-fit rounded-md px-4 py-1 text-Callout text-White disabled:bg-Gray50"
						disabled={true}
					>
						전송
					</button>
				</div>
			</div>
		</div>
	)
}
