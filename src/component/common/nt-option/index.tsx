import { cva } from "class-variance-authority"

import { cn } from "@/config/tailwind"

type NTOptionPT = {
	optionArr: Array<string>
	checkedOption: Array<string>
	onClickOption?: (item: string) => void
	size?: "large" | "medium"
	disabled?: boolean
	itemsPerRow?: number
}

type NTOptionSinglePT = Omit<NTOptionPT, "optionArr" | "checkedOption"> & {
	isClicked?: boolean
	children: string
	onClickOption: () => void
}

export default function NTOption({
	optionArr,
	size,
	disabled,
	checkedOption,
	onClickOption,
	itemsPerRow = 2,
}: NTOptionPT) {
	const rows = []
	for (let i = 0; i < optionArr.length; i += itemsPerRow) {
		rows.push(optionArr.slice(i, i + itemsPerRow))
	}

	return (
		<div className="flex flex-col gap-y-2">
			{rows.map((row, rowIndex) => (
				<div key={rowIndex} className="flex gap-x-2">
					{row.map((option, idx) => (
						<NTOptionSingle
							key={idx}
							size={size}
							disabled={disabled}
							isClicked={checkedOption.includes(option)}
							onClickOption={() => {
								if (onClickOption) onClickOption(option)
								console.log(option)
							}}
						>
							{option}
						</NTOptionSingle>
					))}
				</div>
			))}
		</div>
	)
}

const NTOptionButtonVariants = cva(
	"group flex h-fit w-fit cursor-pointer items-center justify-center px-6 disabled:bg-Gray10 disabled:cursor-default",
	{
		variants: {
			size: {
				large: "text-Headline02 font-Regular rounded-[26px] py-3",
				medium: "text-Body01 font-SemiBold rounded-[35px] py-[10px]",
			},
		},
		defaultVariants: {
			size: "large",
		},
	},
)

const NTOptionSpanVariants = cva("", {
	variants: {
		size: {
			large: " group-disabled:text-Gray50 ",
			medium: " group-disabled:text-Gray70",
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
	isClicked,
	onClickOption,
}: NTOptionSinglePT) {
	return (
		<button
			onClick={onClickOption}
			disabled={disabled}
			className={cn(
				NTOptionButtonVariants({ size }),
				isClicked ? "bg-PB100" : "bg-BGblue01",
			)}
		>
			<span
				className={cn(
					NTOptionSpanVariants({ size }),
					isClicked ? "text-White" : "text-PB100",
				)}
			>
				{children}
			</span>
		</button>
	)
}
