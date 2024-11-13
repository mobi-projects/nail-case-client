import NTIcon from "@/component/common/nt-icon"
import type { ResGetRoomInfo } from "@/util/api/get-room-list"

type ChatHeaderPT = {
	chatRoomInfo: ResGetRoomInfo
}

export default function ChatHeader({ chatRoomInfo }: ChatHeaderPT) {
	return (
		<div className="flex min-h-[3.5rem] w-full items-center justify-between bg-BGblue02 px-4">
			<div className="hidden max-xl:block" />
			<p className="text-Title03 font-SemiBold">{chatRoomInfo.name}</p>
			<NTIcon icon="chat" className="w-12" />
		</div>
	)
}
