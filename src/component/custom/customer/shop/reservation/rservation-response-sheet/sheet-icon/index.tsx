import NTIcon from "@/component/common/nt-icon"
import { cn } from "@/config/tailwind"

type SheetIconPT = {
	isError: boolean
}

export default function SheetIcon({ isError }: SheetIconPT) {
	return (
		<div
			className={cn(
				"flex h-[56px] w-[56px] items-center justify-center overflow-hidden rounded-full lg:scale-90 max-md:scale-75",
				isError ? "bg-PB90" : "bg-gradient-to-t from-PB100 to-PY100 p-0",
			)}
		>
			{isError ? (
				<p className="text-center text-Headline01 text-White">!</p>
			) : (
				<NTIcon
					icon="circleUpRight"
					className="h-[100px] w-[100px] bg-transparent text-Gray90"
				/>
			)}
		</div>
	)
}
