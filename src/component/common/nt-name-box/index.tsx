import type { VariantProps } from "class-variance-authority"
import { cva } from "class-variance-authority"

const NameBoxVarants = cva(
	"w-[63px] h-[28px] rounded-[8px]  text-Callout text-Gray100 flex items-center justify-center font-SemiBold",
	{
		variants: {
			bgColor: {
				BGblue: "bg-BGblue02",
				PY: "bg-PY50",
				Gray: "bg-Gray20",
			},
		},
	},
)
type NTNameBoxPT = VariantProps<typeof NameBoxVarants> & {
	children: React.ReactNode
}
export default function NTNameBox({ bgColor, children }: NTNameBoxPT) {
	return <div className={NameBoxVarants({ bgColor })}>{children}</div>
}
