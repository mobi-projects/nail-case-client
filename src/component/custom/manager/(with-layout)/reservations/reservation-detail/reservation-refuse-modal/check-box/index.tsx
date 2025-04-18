import type { Dispatch, SetStateAction } from "react"

import { cn } from "@/config/tailwind"

export default function CheckBox({
	id: stringId,
	clickedIdx,
	setClickedIdx,
}: {
	id: string
	clickedIdx: number
	setClickedIdx: Dispatch<SetStateAction<number>>
}) {
	const id = parseInt(stringId)
	return (
		<div className="group relative flex items-center justify-center">
			<input
				id={stringId}
				className="h-6 w-6 rounded-full opacity-0 lg:h-5 lg:w-5 max-md:h-3 max-md:w-3"
				type="radio"
				name="rejectReason"
				checked={clickedIdx === id}
				onChange={() => setClickedIdx(id)}
			/>
			<label
				className={cn(
					"absolute h-6 w-6 rounded-full ring-2 ring-Gray30 transition-all group-hover:ring-PB70 lg:h-5 lg:w-5 max-md:h-3 max-md:w-3",
					clickedIdx === id ? "ring-PB70" : "ring-Gray30",
				)}
				htmlFor={stringId}
			/>
			<div
				className={cn(
					"absolute h-4 w-4 cursor-pointer rounded-full transition-all lg:h-3 lg:w-3 max-md:h-2 max-md:w-2",
					clickedIdx === +id ? "bg-PB100 opacity-100" : "group-hover:bg-PB50",
				)}
				onClick={() => setClickedIdx(id)}
			/>
		</div>
	)
}
