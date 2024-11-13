import NTIcon from "@/component/common/nt-icon"
import type { ResCreateRoom } from "@/util/api/create-chat-room"

type ChatHeaderPT = {
	handleCloseChat: VoidFunction
	chatRoomInfo?: ResCreateRoom
}

export default function ChatHeader({
	handleCloseChat,
	chatRoomInfo,
}: ChatHeaderPT) {
	const getShopName = (chatRoomInfo?: ResCreateRoom) => {
		if (chatRoomInfo) {
			return chatRoomInfo.name.split("-")[0]
		} else {
			return ""
		}
	}
	const shopName = getShopName(chatRoomInfo)

	return (
		<div className="flex h-[3rem] w-full items-center justify-between rounded-t-xl bg-BGblue02 px-4">
			<NTIcon icon="chat" className="w-8" />
			<div>{shopName}</div>
			<button
				type="button"
				onClick={handleCloseChat}
				className="pb-1 text-center text-[2rem] text-Black transition-all hover:text-PB110"
			>
				x
			</button>
		</div>
	)
}
