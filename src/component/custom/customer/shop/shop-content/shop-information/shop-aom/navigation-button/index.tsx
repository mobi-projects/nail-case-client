import NTIcon from "@/component/common/nt-icon"
import { cn } from "@/config/tailwind"
type NavigationButtonPT = {
	onclick: () => void
	direction: "left" | "right"
	isVisible: boolean
}
export default function NavigationButton({
	onclick,
	direction,
	isVisible,
}: NavigationButtonPT) {
	return (
		<div
			className={cn(
				"absolute bottom-52 rounded-xl bg-Gray10",
				isVisible ? "cursor-pointer opacity-30 hover:opacity-80" : "opacity-0",
				direction === "left" ? "left-2" : "right-2",
			)}
		>
			<NTIcon
				onClick={onclick}
				className="h-14 w-14"
				icon={direction === "left" ? "expandLeftLight" : "expandRightLight"}
			></NTIcon>
		</div>
	)
}
