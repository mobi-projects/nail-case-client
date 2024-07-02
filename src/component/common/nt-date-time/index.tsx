import { cn } from "@/config/tailwind"

type NTDateTimePT = {
	children: string
	isClicked?: boolean
	clickCallback?: VoidFunction
}

export default function NTDateTime({
	children,
	isClicked,
	clickCallback,
}: NTDateTimePT) {
	return (
		<button
			className={cn(
				"h-fit w-fit rounded-[8px] px-[14px] py-[10px] text-Body01 font-SemiBold",
				isClicked ? "bg-PB90 text-White" : "bg-Gray10 text-Gray40",
			)}
			onClick={() => {
				if (clickCallback) clickCallback()
			}}
		>
			{children}
		</button>
	)
}
