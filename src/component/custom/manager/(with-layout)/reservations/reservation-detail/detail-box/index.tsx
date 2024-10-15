import type { ReactNode } from "react"

type DeatailBoxPT = {
	content?: string
	title: string
	children?: ReactNode
}

export default function DeatailBox({ content, title, children }: DeatailBoxPT) {
	return (
		<div className="flex min-h-[70px] w-full items-center gap-x-4 border-b border-Gray20 pl-12">
			<p className="min-w-[5.5rem] text-Body02 font-SemiBold text-Gray80">
				{title}
			</p>
			<div className="text-Body02 font-SemiBold text-PB100">
				{children ? children : content}
			</div>
		</div>
	)
}
