import { cva } from "class-variance-authority"

type NTContentPT = {
	mode?: "day" | "dark"
	children: string | number
}

const ContentVaraints = cva(
	"flex h-fit w-fit items-center justify-center rounded-[35px] border-[0.5px] border-Gray30 px-[28px] py-[7px] text-Callout",
	{
		variants: {
			mode: {
				day: "bg-Gray10  text-Gray50",
				dark: " bg-Gray100/50  text-White",
			},
		},
		defaultVariants: { mode: "day" },
	},
)

export default function NTContent({ children, mode }: NTContentPT) {
	return (
		<div className={ContentVaraints({ mode })}>
			<span>{children}</span>
		</div>
	)
}
