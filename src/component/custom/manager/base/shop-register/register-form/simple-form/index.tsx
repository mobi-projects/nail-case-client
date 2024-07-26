import { forwardRef } from "react"

const SimpleInput = forwardRef<HTMLInputElement>(function SimpleInput(_, ref) {
	return (
		<div className="flex h-fit w-full flex-col justify-center gap-[5px]">
			<input
				className="h-[35px] w-1/2 min-w-[80px] rounded-[3px] border border-Gray20 px-2 text-Body01 transition-all duration-150 focus:border-2 focus:border-PB110 focus-visible:outline-none"
				ref={ref}
			/>
			<p className="text-Caption02 text-[#FF2C45]">오류남..</p>
		</div>
	)
})
export default SimpleInput
