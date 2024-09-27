import type { ReactNode } from "react"

type DeatailBoxPT = {
	children: ReactNode
	title: string
}

export default function DeatailBox({ children, title }: DeatailBoxPT) {
	return (
		<div className="grid w-full grid-cols-[1fr_3.5fr]">
			<p className="text-Body02 font-SemiBold">{title}</p>
			{children}
		</div>
	)
}
