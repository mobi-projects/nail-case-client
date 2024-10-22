import type { PropsWithChildren } from "react"

type FocusingCardPT = PropsWithChildren & {
	title?: string
}
export default function FocusingCard({ title, children }: FocusingCardPT) {
	return (
		<div
			tabIndex={-1}
			className="flex h-fit w-full flex-col rounded-[26px] border-[0.75px] border-transparent bg-White px-10 py-8 drop-shadow-[2.99px_2.99px_14px_rgba(224,224,224,0.8)] transition-[border-color] duration-100 focus-within:border-PB50 focus-within:drop-shadow-[2px_2px_19.1px_rgba(128,214,248,0.4)] focus:outline-none max-md:px-5 max-md:py-4 max-lg:gap-0"
		>
			{title && (
				<h2 className="text-[22px] font-SemiBold text-Gray100 lg:text-[20px] max-md:text-[16px]">
					{title}
				</h2>
			)}
			{children}
		</div>
	)
}
