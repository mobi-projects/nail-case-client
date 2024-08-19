import type { InputHTMLAttributes } from "react"
import { forwardRef } from "react"

type SimpleInputPT = InputHTMLAttributes<HTMLInputElement> & {
	errorMessage?: string
}

const SimpleInput = forwardRef<HTMLInputElement, SimpleInputPT>(
	function SimpleInput({ errorMessage, ...rest }, ref) {
		return (
			<div className="flex h-[60px] w-full flex-col justify-start gap-[5px]">
				<input
					className="h-[35px] w-1/2 min-w-[80px] rounded-[3px] border border-Gray20 px-2 text-Body01 transition-all duration-150 focus:border-2 focus:border-PB110 focus-visible:outline-none"
					ref={ref}
					{...rest}
					autoComplete="off"
				/>
				{errorMessage && (
					<p className="text-Caption02 text-[#FF2C45]">{errorMessage}</p>
				)}
			</div>
		)
	},
)
export default SimpleInput
