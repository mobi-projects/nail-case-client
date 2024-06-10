import * as SliderPrimitive from "@radix-ui/react-slider"
import * as React from "react"

import { cn } from "@/config/tailwind/util"

type SliderPT = {
	upperLimit: number
	curValue: number
	onCurValueChange?: (value: number) => void
}

const Slider = React.forwardRef<
	React.ElementRef<typeof SliderPrimitive.Root>,
	React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root> & SliderPT
>(({ upperLimit, curValue, onCurValueChange, className, ...props }, ref) => {
	if (props.disabled) curValue = 0
	const halfNumber = Number(upperLimit / 2)
	const half = Number.isInteger(halfNumber)
		? halfNumber.toString()
		: halfNumber.toFixed(1)

	return (
		<div className="flex h-fit w-fit flex-col gap-2">
			<SliderPrimitive.Root
				ref={ref}
				className={cn(
					"relative flex h-[10px] w-[408px] cursor-pointer touch-none select-none items-center",
					className,
				)}
				value={[curValue]}
				onValueChange={(values) =>
					onCurValueChange && onCurValueChange(values[0])
				}
				max={upperLimit}
				{...props}
			>
				<SliderPrimitive.Track className="relative h-full w-full grow overflow-hidden rounded-full bg-BGblue01 disabled:bg-red-900">
					<SliderPrimitive.Range
						className={cn(
							"absolute h-full bg-PB80",
							props.disabled && "bg-BGblue01",
						)}
					/>
				</SliderPrimitive.Track>
				<SliderPrimitive.Thumb
					className={cn(
						"block h-[15px] w-[15px] rounded-full bg-PB100",
						props.disabled && "bg-[#D9D9D9]",
					)}
				/>
			</SliderPrimitive.Root>
			{upperLimit > 1 && (
				<span
					className={cn(
						"flex w-full justify-between text-Body02 text-PB100",
						props.disabled && "text-Gray50",
					)}
				>
					<p>0</p>
					<p>{half}</p>
					<p>{upperLimit}</p>
				</span>
			)}
		</div>
	)
})
Slider.displayName = "Slider"

export default Slider
