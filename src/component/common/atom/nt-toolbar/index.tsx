import { cva } from "class-variance-authority"
import type { ReactNode } from "react"

type NTToolbarSinglePT = {
	children: React.ReactNode
	select: boolean
	position: "top" | "bottom"
	topStyle?: "default" | "light"
	bottomTextSize?: "small" | "large"
	isSelected: VoidFunction
}

const TollbarVariants = cva("flex justify-center m-0 p-0 cursor-pointer", {
	variants: {
		position: {
			top: "items-end  w-[81.5px] h-[38px] hover:text-Gray50 text-Body01  text-Black",
			bottom: "items-start w-[110px] h-[44px] hover:text-PB50 text-Gray50 ",
		},
		topStyle: {
			default: "border-PB100",
			light: "border-PB80",
		},
		bottomTextSize: {
			small: "text-Body01",
			large: "text-Title03",
		},
		select: {
			true: "pointer-events-none",
			false: "",
		},
	},
	compoundVariants: [
		{ position: "top", topStyle: "default" },
		{ position: "top", topStyle: "light" },
		{ position: "bottom", bottomTextSize: "small" },
		{ position: "bottom", bottomTextSize: "large" },
		{
			position: "top",
			topStyle: "default",
			select: true,
			className: "text-PB100 border-t-2",
		},
		{
			position: "top",
			topStyle: "light",
			select: true,
			className: "text-PB80 border-t-2",
		},
		{
			position: "bottom",
			select: true,
			className: "border-b-2 text-PB100 border-PB100",
		},
	],
})

function NTToolbarSingle({
	children,
	position,
	topStyle,
	bottomTextSize,
	select,
	isSelected,
}: NTToolbarSinglePT) {
	return (
		<div
			className={TollbarVariants({
				position,
				topStyle,
				bottomTextSize,
				select,
			})}
			onClick={isSelected}
		>
			{children}
		</div>
	)
}
type NTToolbarPT = Omit<
	NTToolbarSinglePT,
	"children" | "select" | "isSelected"
> & {
	arr: ReactNode[]
	selected: number | null
	isSelected: (idx: number) => void
}

export default function NTToolbar({
	arr,
	position,
	topStyle,
	bottomTextSize,
	selected,
	isSelected,
}: NTToolbarPT) {
	return (
		<div>
			{arr.map((children, idx) => (
				<NTToolbarSingle
					key={idx}
					position={position}
					topStyle={topStyle}
					bottomTextSize={bottomTextSize}
					select={selected === idx}
					isSelected={() => isSelected(idx)}
				>
					{children}
				</NTToolbarSingle>
			))}
		</div>
	)
}
