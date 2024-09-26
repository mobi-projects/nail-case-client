import type { Dispatch, SetStateAction } from "react"

import type { TResAOM } from "@/util/api-v2/list-monthly-art"

import { hasAOMImages } from "../aom.utils"

import AOMImageList from "./aom-image-list"

type AOMImageListPT = {
	aomInfoArr: TResAOM
	focusedIdx: number
	setFocusedIdx: Dispatch<SetStateAction<number>>
}

export default function AOMImageListSection({
	aomInfoArr,
	focusedIdx,
	setFocusedIdx,
}: AOMImageListPT) {
	return (
		hasAOMImages(aomInfoArr) && (
			<AOMImageList
				aomInfoArr={aomInfoArr}
				focusedIdx={focusedIdx}
				setFocusedIdx={setFocusedIdx}
			/>
		)
	)
}
