type InstructionPT = {
	label: string
	description: string
	example?: string
	required: boolean
}

export default function Instruction({
	label,
	description,
	example,
	required,
}: InstructionPT) {
	return (
		<div className="flex h-fit max-h-[80px] w-full flex-col gap-[1px]">
			<section className="flex justify-start gap-[5px]">
				{required && <span className="text-Body02 text-[#FF2C45]">*</span>}
				<span className="col-start-2 text-Headline01 text-Gray100">
					{label}
				</span>
			</section>
			<section className="flex flex-col justify-between text-Callout text-Gray60">
				<p>{description}</p>
				{example && <p className="italic">ex) {example}</p>}
			</section>
		</div>
	)
}
