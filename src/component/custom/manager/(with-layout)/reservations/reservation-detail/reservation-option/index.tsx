import NTOption from "@/component/common/nt-option"

type ReservationOptionPT = {
	title: string
	option: Array<string>
}

export default function ReservationOption({
	title,
	option,
}: ReservationOptionPT) {
	return (
		<div className="flex h-fit w-full items-center gap-4">
			<p className="min-w-[60px] text-Callout text-Gray50">{title}</p>
			<NTOption optionArr={option} optionClassName="mt-1" />
		</div>
	)
}
