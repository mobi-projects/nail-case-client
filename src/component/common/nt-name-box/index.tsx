import type { VariantProps } from "class-variance-authority"
import { cva } from "class-variance-authority"

const NameBoxVarants = cva(
	"w-[63px] h-[28px] rounded-[8px]  text-Callout text-Gray100 flex items-center justify-center font-SemiBold",
	{
		variants: {
			bgColor: {
				blue: "bg-BGblue02",
				yellow: "bg-PY50",
				gray: "bg-Gray20",
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
