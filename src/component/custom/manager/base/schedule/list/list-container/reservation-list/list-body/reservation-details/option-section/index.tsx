import NTOption from "@/component/common/nt-option"

type OptionSectionPT = {
	required?: boolean
	sectionTitle: string
	options: string[]
}
export function OptionSection({
	required = false,
	sectionTitle,
	options,
}: OptionSectionPT) {
	return (
		<div className="grid grid-cols-[80px_1fr] items-center">
			<div className="flex h-full w-full items-center gap-[1px] text-Callout">
				{required && <p className="text-[#FF2C45]">*</p>}
				<p className="text-Gray50">{sectionTitle}</p>
			</div>
			<NTOption optionArr={options} />
		</div>
	)
}
