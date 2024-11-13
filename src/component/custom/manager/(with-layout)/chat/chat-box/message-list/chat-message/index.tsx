import { cn } from "@/config/tailwind"

import { showTime } from "../../../../layout/header-menu/alarm/alarm-pulldown/alarm-pulldown.util"

type ChatMessagePT = {
	message: string
	sentByShop?: boolean
	timeStamp: number
}

/** -----------------------------채팅 메세지  ----------------------------- */

export default function ChatMessage({
	message,
	timeStamp,
	sentByShop,
}: ChatMessagePT) {
	return (
		<div className={cn("flex w-full flex-col", sentByShop && "items-end")}>
			<div
				className={cn(
					"flex w-fit max-w-[80%] items-end gap-x-1",
					sentByShop ? "flex-row" : "flex-row-reverse",
				)}
			>
				<span className="min-w-[2rem] pb-1 text-[11px] text-Gray70">
					{showTime(timeStamp)}
				</span>
				<div
					className={cn(
						"h-fit w-fit rounded-2xl p-2 text-Body01",
						sentByShop ? "bg-PY70" : "bg-White",
					)}
				>
					<span className="max-md:text-[12px]">{message}</span>
				</div>
			</div>
		</div>
	)
}
