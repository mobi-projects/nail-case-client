import { getTimeDifference } from "@/component/custom/manager/(with-layout)/layout/header-menu/alarm/alarm-pulldown/alarm-pulldown.util"
import { cn } from "@/config/tailwind"

type ChatMessagePT = {
	isSender?: boolean
	message: string
	sentByShop?: boolean
	timeStamp: number
}
export default function ChatMessage({
	isSender = true,
	message,
	timeStamp,
}: ChatMessagePT) {
	return (
		<div className={cn("flex w-full flex-col", isSender && "items-end")}>
			<div
				className={cn(
					"flex w-fit max-w-[80%] items-end gap-x-1",
					isSender ? "flex-row" : "flex-row-reverse",
				)}
			>
				<span className="min-w-[2rem] pb-1 text-[10px] text-Gray70">
					{getTimeDifference(timeStamp)}
				</span>
				<div
					className={cn(
						"h-fit w-fit rounded-2xl p-2 text-Callout",
						isSender ? "bg-PY70" : "bg-White",
					)}
				>
					<span className="max-md:text-[12px]">{message}</span>
				</div>
			</div>
		</div>
	)
}
