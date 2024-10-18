import { cva } from "class-variance-authority"
import type { ReactNode } from "react"

import type { TStatusExcludeCanceled } from "../../reservations.type"

type DeatailBoxPT = {
	content?: string
	title: string
	children?: ReactNode
	status?: TStatusExcludeCanceled
}

export default function DeatailBox({
	content,
	title,
	children,
	status,
}: DeatailBoxPT) {
	const textVarinats = cva("text-Body02 font-SemiBold ", {
		variants: {
			status: {
				PENDING: "text-PB90",
				REJECTED: "text-Gray50",
				CONFIRMED: "text-PURPLE50",
				COMPLETED: "text-GREEN50",
			},
		},
	})
	return (
		<div className="flex min-h-[70px] w-full items-center gap-x-4 border-b border-Gray20 pl-12">
			<p className="min-w-[5.5rem] text-Body02 font-SemiBold text-Gray80">
				{title}
			</p>
			<div className={textVarinats({ status })}>
				{children ? children : content}
			</div>
		</div>
	)
}
