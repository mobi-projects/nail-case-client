import NTIcon from "@/component/common/nt-icon"

type ChatHeaderPT = {
	handleCloseChat: VoidFunction
}

export default function ChatHeader({ handleCloseChat }: ChatHeaderPT) {
	return (
		<div className="flex h-[3rem] w-full items-center justify-between rounded-t-xl bg-BGblue02 px-4">
			<NTIcon icon="chat" className="w-8" />
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
