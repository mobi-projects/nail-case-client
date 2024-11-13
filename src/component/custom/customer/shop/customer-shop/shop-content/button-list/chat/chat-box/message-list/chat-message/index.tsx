import { showTime } from "@/component/custom/manager/(with-layout)/layout/header-menu/alarm/alarm-pulldown/alarm-pulldown.util"
import { cn } from "@/config/tailwind"

type ChatMessagePT = {
	message: string
	sentByShop?: boolean
	timeStamp: number
}
export default function ChatMessage({
	sentByShop,
	message,
	timeStamp,
}: ChatMessagePT) {
	return (
		<div className={cn("flex w-full flex-col", !sentByShop && "items-end")}>
			<div
				className={cn(
					"flex w-fit max-w-[80%] items-end gap-x-1",
					sentByShop ? "flex-row-reverse" : "flex-row",
				)}
			>
				<span className="min-w-[2rem] pb-1 text-[10px] text-Gray70">
					{showTime(timeStamp)}
				</span>
				<div
					className={cn(
						"h-fit w-fit rounded-2xl p-2 text-Callout",
						sentByShop ? "bg-White" : "bg-PY70",
					)}
				>
					<span className="max-md:text-[12px]">{message}</span>
				</div>
			</div>
		</div>
	)
}
