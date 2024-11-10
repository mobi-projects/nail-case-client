import type { Dispatch, KeyboardEvent, SetStateAction } from "react"

import type { TChatMessage } from "@/hook/use-chat"
import { getNowStamp } from "@/util/common"

type MessageInputPT = {
	message: TChatMessage
	setMessage: Dispatch<SetStateAction<TChatMessage>>
	onSubmitMessage: (e: KeyboardEvent<HTMLTextAreaElement>) => void
}

export default function MessageInput({
	message,
	setMessage,
	onSubmitMessage,
}: MessageInputPT) {
	return (
		<div className="rounded-b-xl">
			<textarea
				placeholder="메세지 입력"
				className="scrollbar-none h-[5rem] w-full resize-none bg-White px-2 py-4 focus:border-none focus:outline-none max-md:w-full"
				onChange={(e) =>
					setMessage({
						message: e.target.value,
						sentByShop: false,
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
	)
}
