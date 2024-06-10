import { cva } from "class-variance-authority"

import { cn } from "@/config/tailwind"

const toggleVariants = cva(
	"relative inline-flex items-center h-[48px] rounded-[37px] w-[96.14px]",
	{
		variants: {
			checked: {
				true: "bg-PB80",
				false: "bg-Gray40",
			},
		},
		defaultVariants: {
			checked: false,
		},
	},
)

const circleVariants = cva(
	"inline-block w-[38px] h-[38px] transform bg-white rounded-[37px] transition-transform",
	{
		variants: {
			checked: {
				true: "translate-x-[51px]",
				false: "translate-x-[6px]",
			},
		},
		defaultVariants: {
			checked: false,
		},
	},
)

export type ToggleSwitchProps = {
	checked: boolean
	onChange: () => void
}

const NTToggleSwitch: React.FC<ToggleSwitchProps> = ({ checked, onChange }) => {
	return (
		<button
			type="button"
			role="switch"
			aria-checked={checked}
			onClick={onChange}
			className={cn(toggleVariants({ checked }))}
		>
			<span className={cn(circleVariants({ checked }))} />
		</button>
	)
}

export default NTToggleSwitch
