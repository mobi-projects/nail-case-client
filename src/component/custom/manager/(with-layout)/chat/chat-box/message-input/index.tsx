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
	onSubmitMessage,
	setMessage,
}: MessageInputPT) {
	return (
		<div className="">
			<textarea
				placeholder="메세지 입력"
				className="scrollbar-none h-[8rem] w-full resize-none bg-White px-4 py-4 text-Body01 focus:border-none focus:outline-none max-md:w-full"
				onChange={(e) =>
					setMessage({
						message: e.target.value,
						sentByShop: true,
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
					className="h-fit w-fit rounded-md bg-PB70 px-5 py-2 text-Callout text-Headline02 text-White transition-all hover:bg-PB100 disabled:cursor-default disabled:bg-Gray50"
					disabled={message?.message === ""}
					type="submit"
				>
					전송
				</button>
			</div>
		</div>
	)
}
