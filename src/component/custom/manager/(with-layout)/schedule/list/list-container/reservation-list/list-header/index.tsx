import NTIcon from "@/component/common/nt-icon"
import { cn } from "@/config/tailwind"

type SectionHeaderPT = {
	listCnt: number
	listTitle: string
	isExpanded: boolean
	onHandleExpansion: VoidFunction
}

export default function ListHeader({
	listTitle,
	listCnt,
	isExpanded,
	onHandleExpansion,
}: SectionHeaderPT) {
	const printedTitle = getPrintedTitle(listTitle, listCnt)
	return (
		<header
			className={cn(
				"absolute z-10 flex h-[65px] w-full items-center justify-between rounded-[18px] bg-PB90 px-[34px] transition-colors",
				isExpanded && "bg-PB90 text-White",
				!isExpanded && "bg-BGblue01 text-PB100",
			)}
		>
			<p className="text-Title03 font-SemiBold">{printedTitle}</p>
			<NTIcon
				className={cn(
					"h-full transition-transform",
					!isExpanded && "rotate-180",
				)}
				icon="expandUpLight"
				onClick={onHandleExpansion}
			/>
		</header>
	)
}

const getPrintedTitle = (listTitle: string, listCnt: number) =>
	[listTitle, `(${listCnt} 건)`].join(" ")
