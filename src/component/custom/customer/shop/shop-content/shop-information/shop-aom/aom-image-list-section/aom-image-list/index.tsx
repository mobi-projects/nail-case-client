import type { Dispatch, SetStateAction } from "react"

import type { TResAOM } from "@/util/api-v2/list-monthly-art"

import AOMImageSingle from "./aom-image-single"

type AOMImageSectionPT = {
	aomInfoArr: TResAOM
	focusedIdx: number
	setFocusedIdx: Dispatch<SetStateAction<number>>
}

export default function AOMImageList({
	aomInfoArr,
	focusedIdx,
	setFocusedIdx,
}: AOMImageSectionPT) {
	return (
		<div className="flex h-full w-full items-center">
			<div
				className={
					"scrollbar relative flex h-full w-full transform items-center gap-x-5 overflow-x-hidden transition-transform duration-300"
				}
			>
				<div
					className={
						"absolute top-1 flex w-full transform flex-col items-center gap-x-5 transition-transform duration-1000"
					}
				>
					{aomInfoArr.map((info, idx) => (
						<AOMImageSingle
							imageUrl={info.imageUrl}
							key={info.imageId}
							isFocused={focusedIdx === idx}
							idx={idx}
							setFocusedIdx={setFocusedIdx}
						/>
					))}
				</div>
			</div>
		</div>
	)
}
