import type { PropsWithChildren } from "react"

type FocusingCardPT = PropsWithChildren & {
	title?: string
}
export default function FocusingCard({ title, children }: FocusingCardPT) {
	return (
		<div
			tabIndex={-1}
			aria-hidden
			className="flex h-fit w-full flex-col gap-[16px] rounded-[26px] border-[0.75px] border-transparent bg-White px-[40px] py-[30px] drop-shadow-[2.99px_2.99px_14px_rgba(224,224,224,0.8)] transition-[border-color] duration-100 focus-within:border-PB50 focus-within:drop-shadow-[2px_2px_19.1px_rgba(128,214,248,0.4)] focus:outline-none"
		>
			{title && (
				<h2 className="text-[22px] font-SemiBold text-Gray100">{title}</h2>
			)}
			{children}
		</div>
	)
}
