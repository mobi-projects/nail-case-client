import { useState, type Dispatch, type SetStateAction } from "react"

import NTIcon from "@/component/common/nt-icon"
import { cn } from "@/config/tailwind"
import type { ResGetRoomInfo } from "@/util/api/get-room-list"

import ChatUser from "./chat-user"

type ChatUserListPT = {
	chatRoomArr: Array<ResGetRoomInfo>
	selectedChatRoomId: number
	setSelectedChatRoomId: Dispatch<SetStateAction<number>>
	// isSideBarOpen: boolean
	// setIsSideBarOpen: Dispatch<SetStateAction<boolean>>
}

export default function ChatUserList({
	chatRoomArr,
	setSelectedChatRoomId,
	selectedChatRoomId,
}: ChatUserListPT) {
	const [isSideBarOpen, setIsSideBarOpen] = useState(true)
	const handleSideBar = () => {
		if (isSideBarOpen) {
			return setIsSideBarOpen(false)
		}
	}
	return (
		<div
			className={cn(
				"scrollbar h-full w-full overflow-y-auto border bg-BGblue01 transition-all max-xl:absolute max-xl:left-0 max-xl:top-0",
				isSideBarOpen
					? "max-xl:w-[20rem]"
					: "scrollbar-none h-[3.5rem] border-0 max-xl:w-7",
			)}
		>
			<MobilSideBarController
				isSideBarOpen={isSideBarOpen}
				setIsSideBarOpen={setIsSideBarOpen}
				selectedChatRoomId={selectedChatRoomId}
			/>
			<div
				className={cn(
					"transition-all duration-200",
					!isSideBarOpen && "max-h-0 opacity-0",
				)}
			>
				{chatRoomArr.map((roomInfo) => (
					<ChatUser
						key={roomInfo.chatRoomId}
						chatRoomInfo={roomInfo}
						isSelected={selectedChatRoomId === roomInfo.chatRoomId}
						setSelectedChatRoomId={setSelectedChatRoomId}
						handleSideBar={handleSideBar}
					/>
				))}
			</div>
		</div>
	)
}

type MobilSideBarControllerPT = {
	isSideBarOpen: boolean
	setIsSideBarOpen: Dispatch<SetStateAction<boolean>>
	selectedChatRoomId: number
}

function MobilSideBarController({
	isSideBarOpen,
	setIsSideBarOpen,
	selectedChatRoomId,
}: MobilSideBarControllerPT) {
	return (
		<div
			className={cn(
				"hidden h-[3.5rem] items-center bg-BGblue02 px-2 max-xl:flex",
				!isSideBarOpen && "px-0",
				selectedChatRoomId === -1 && "bg-White",
			)}
		>
			<NTIcon
				icon="expandRight"
				className={cn(
					"h-7 w-7 transition-all",
					isSideBarOpen ? "rotate-180" : "rotate-0",
				)}
				onClick={() => setIsSideBarOpen((prev) => !prev)}
			/>
		</div>
	)
}
