import { cva } from "class-variance-authority"

import { cn } from "@/config/tailwind"

import NTIcon from "../nt-icon"

const EventDetailVariants = cva(
	" w-fit min-w-[263px] pl-[21px] rounded-[12px] flex justify-start items-center py-[14px]",
	{
		variants: {
			variant: {
				PB: "bg-BGblue02 active:border-PB50   ",
				PY: "bg-PY50 bg-opacity-60 active:border-PY100   ",
				Gray: "bg-Gray10 active:border-Gray50  ",
				Plus: "border-[1.5px] border-dashed",
			},
		},
		defaultVariants: { variant: "Plus" },
	},
)

export type NTEventDetailPT = {
	variant: "PB" | "PY" | "Gray" | "Plus"
	children?: React.ReactNode
	className?: string
	name?: string
	add: boolean
}

export default function NTEventDetail({
	variant,
	className,
	children,
	name,
	add,
	...props
}: NTEventDetailPT) {
	return (
		<div
			className={cn(
				EventDetailVariants({ variant }),
				className,
				add ? "gap-[8px]" : "gap-[12px] active:border",
			)}
			{...props}
		>
			{add ? (
				<>
					<span className="text-Callout font-Light text-Gray100">
						새로운 일정 추가하기
					</span>
					<NTIcon
						icon="addRoundLight"
						className="flex h-[22px] w-[22px] items-center"
					></NTIcon>
				</>
			) : (
				<>
					<span className="text-Body02 font-Bold text-Gray100">{name}</span>
					<span className="text-Callout font-Light text-Gray100">
						{children}
					</span>
				</>
			)}
		</div>
	)
}
