import type { Dispatch, SetStateAction } from "react"

import { cn } from "@/config/tailwind"
import type { ResGetRoomInfo } from "@/util/api/get-room-list"
import { decomposeStamp, padStartToPrinting } from "@/util/common"

type ChatUserPT = {
	chatRoomInfo: ResGetRoomInfo
	isSelected: boolean
	setSelectedChatRoomId: Dispatch<SetStateAction<number>>
}
export default function ChatUser({
	chatRoomInfo,
	setSelectedChatRoomId,
	isSelected,
}: ChatUserPT) {
	const { chatRoomId, lastMessage, name, lastMessageTime } = chatRoomInfo

	const getLastMessageString = (timeStamp: number) => {
		const { month, hour, date, min } = decomposeStamp(timeStamp as number)
		const formmattedTime = padStartToPrinting("time", hour)
		const formattedHour = padStartToPrinting("time", min)
		return `${month}/${date} ${formmattedTime}:${formattedHour}`
	}

	const getUserName = (name: string) => {
		const userName = name.split("-")[1]
		return userName
	}

	const onClickChatUser = () => {
		setSelectedChatRoomId(chatRoomId)
	}

	const lastMessageStirng = getLastMessageString(lastMessageTime as number)
	const userName = getUserName(name)

	return (
		<div
			onClick={onClickChatUser}
			className={cn(
				"relative grid h-[6rem] w-full cursor-pointer grid-rows-[1fr_3fr] border-y border-Gray20 bg-White px-2 shadow-customGray60 transition-all hover:bg-Gray10",
				isSelected && "bg-Gray10",
			)}
		>
			<div className="flex h-full items-center space-x-3 pt-3">
				<div className="space-x-1">
					<span className="text-Headline02 font-Bold text-Black">
						{userName}
					</span>
					<span className="text-[16px] font-SemiBold text-Gray40">
						님의 메세지입니다 • {lastMessageStirng}
					</span>
				</div>
			</div>
			<div className="line-clamp-1 h-[3rem] overflow-hidden pt-2 text-Headline02 text-Gray60">
				{lastMessage?.trim()}
			</div>
		</div>
	)
}
