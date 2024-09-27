import type { Dispatch, SetStateAction } from "react"

import NTIcon from "@/component/common/nt-icon"
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
		<div className="relative flex items-center justify-center">
			<input
				id={stringId}
				className="h-6 w-6 rounded-full opacity-0"
				type="radio"
				name="rejectReason"
				checked={clickedIdx === id}
				onChange={() => setClickedIdx(id)}
			/>
			<label
				className={cn(
					"absolute left-0 top-0 h-6 w-6 rounded-full ring-1 ring-Gray50",
					clickedIdx === id ? "bg-PY90" : "border bg-White",
				)}
				htmlFor={stringId}
			/>
			<NTIcon
				icon="check"
				className={cn(
					"absolute left-0 top-0 h-6 w-6 cursor-pointer rounded-full text-PB110 transition-all",
					clickedIdx === +id
						? "opacity-100"
						: "text-transparent hover:bg-PY50 hover:text-PB70",
				)}
				onClick={() => setClickedIdx(id)}
			/>
		</div>
	)
}
