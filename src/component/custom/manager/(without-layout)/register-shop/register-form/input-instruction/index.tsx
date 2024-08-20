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
			<section className="grid grid-cols-[15px_1fr]">
				{required && <span className="text-Body02 text-[#FF2C45]">*</span>}
				<span className="col-start-2 text-Headline01 text-Gray100">
					{label}
				</span>
			</section>
			<section className="flex flex-col justify-between text-Callout text-Gray60">
				<p>{description}</p>
				{example && <p>ex) {example}</p>}
			</section>
		</div>
	)
}
