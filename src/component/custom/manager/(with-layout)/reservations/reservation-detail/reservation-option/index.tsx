import NTOption from "@/component/common/nt-option"
import { cn } from "@/config/tailwind"

type ReservationOptionPT = {
	title: string
	option: Array<string>
	require?: boolean
}

export default function ReservationOption({
	title,
	option,
	require = true,
}: ReservationOptionPT) {
	return (
		<div className="flex h-fit w-full items-center gap-4">
			<p className="min-w-[60px] text-Callout text-Gray50">
				<span className={cn(require ? "text-red-500" : "text-transparent")}>
					*
				</span>
				{title}
			</p>
			<NTOption optionArr={option} optionClassName="mt-1" />
		</div>
	)
}
