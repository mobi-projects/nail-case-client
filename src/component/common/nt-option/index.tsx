"use client"

import { cva } from "class-variance-authority"
import { useState } from "react"

import { cn } from "@/config/tailwind"

type NTOptionPT = {
	optionArr: Array<string>
	clickCallback?: VoidFunction
	size?: "large" | "medium"
	disabled?: boolean
}
type NTOptionSinglePT = Omit<NTOptionPT, "optionArr"> & {
	children: string
}

export default function NTOption({
	optionArr,
	clickCallback,
	size,
	disabled,
}: NTOptionPT) {
	return (
		<div className="flex gap-x-2">
			{optionArr.map((option, idx) => (
				<NTOptionSingle
					key={idx}
					clickCallback={clickCallback}
					size={size}
					disabled={disabled}
				>
					{option}
				</NTOptionSingle>
			))}
		</div>
	)
}

const NTOptionButtonVaraints = cva(
	"group flex h-fit w-fit cursor-pointer items-center justify-center px-6 disabled:bg-Gray10",
	{
		variants: {
			size: {
				large: "text-Headline02  rounded-[26px] py-3",
				medium: "text-Body01 rounded-[35px] py-[10px]",
			},
		},
		defaultVariants: {
			size: "large",
		},
	},
)

const NTOptionSpanVaraints = cva("", {
	variants: {
		size: {
			large: " group-disabled:text-Gray50",
			medium: "  group-disabled:text-Gray70",
		},
	},
	defaultVariants: {
		size: "large",
	},
})

function NTOptionSingle({
	children,
	disabled,
	size,
	clickCallback,
}: NTOptionSinglePT) {
	const [isClicked, setIsClicked] = useState(false)
	return (
		<button
			onClick={() => {
				if (!disabled) {
					setIsClicked((prev) => !prev)
					if (clickCallback) clickCallback()
				}
			}}
			disabled={disabled}
			className={cn(
				NTOptionButtonVaraints({ size }),
				isClicked ? "bg-PB100" : "bg-BGblue01",
			)}
		>
			<span
				className={cn(
					NTOptionSpanVaraints({ size }),
					isClicked ? "text-White" : "text-PB100",
				)}
			>
				{children}
			</span>
		</button>
	)
}
