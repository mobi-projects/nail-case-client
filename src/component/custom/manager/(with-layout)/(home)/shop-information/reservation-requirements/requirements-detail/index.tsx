import NTOption from "@/component/common/nt-option"
import { cn } from "@/config/tailwind"

type RequirementsDetailPT = {
	title: string
	options: string[]
	isLastItem: boolean
}

export default function RequirementsDetail({
	title,
	options,
	isLastItem,
}: RequirementsDetailPT) {
	return (
		<div
			className={cn("py-5", isLastItem ? "" : "border-b-[0.5px] border-Gray10")}
		>
			<div className="pb-2 text-Headline02 text-Gray80">{title}</div>
			<NTOption
				optionArr={options}
				size="large"
				optionClassName=" lg:text-[14px] gap-2"
			/>
		</div>
	)
}
