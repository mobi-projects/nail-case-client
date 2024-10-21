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
				"absolute top-1/2 -translate-y-1/2 rounded-xl bg-Gray10",
				isVisible ? "cursor-pointer opacity-30 hover:opacity-80" : "opacity-0",
				direction === "left" ? "left-2" : "right-2",
			)}
		>
			<NTIcon
				onClick={onclick}
				className="h-14 w-14 md:h-8 md:w-8 lg:h-10 lg:w-10 xl:h-12 xl:w-12 max-sm:h-6 max-sm:w-6"
				icon={direction === "left" ? "expandLeftLight" : "expandRightLight"}
			></NTIcon>
		</div>
	)
}
