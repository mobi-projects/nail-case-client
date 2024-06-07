import { cva } from "class-variance-authority"

type NTToolbarPT = {
	children: React.ReactNode
	active: boolean
	position: "top" | "bottom"
	topStyle?: "default" | "light"
	bottomTextSize?: "small" | "large"
	onClick?: () => void
}

const TollbarVariants = cva("flex justify-center m-0 p-0", {
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
		active: {
			true: "",
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
			active: true,
			className: "text-PB100 border-t-2",
		},
		{
			position: "top",
			topStyle: "light",
			active: true,
			className: "text-PB80 border-t-2",
		},
		{
			position: "bottom",
			active: true,
			className: "border-b-2 text-PB100 border-PB100",
		},
	],
})

export default function NTToolbar({
	children,
	position,
	topStyle,
	bottomTextSize,
	active,
	onClick,
}: NTToolbarPT) {
	return (
		<div
			className={TollbarVariants({
				position,
				topStyle,
				bottomTextSize,
				active,
			})}
			onClick={onClick}
		>
			{children}
		</div>
	)
}
