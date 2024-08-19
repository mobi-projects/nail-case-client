import type { PropsWithChildren } from "react"

import Instruction from "./instruction"

type InputWrapperPT = PropsWithChildren & {
	label: string
	description: string
	example?: string
	required: boolean
}
export default function InputWrapper({
	label,
	description,
	example,
	required,
	children,
}: InputWrapperPT) {
	return (
		<section className="flex flex-col gap-[10px]">
			<Instruction {...{ required, label, description, example }} />
			{children}
		</section>
	)
}
