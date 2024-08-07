"use client"
import { useState } from "react"

import AOMImageList from "./aom-image-list-section"
import ImageUploadBox from "./image-upload-box"
import { aomImageArr } from "./mock"

export default function AOM() {
	const [foucsedIdx, setFocusedIdx] = useState(0)

	return (
		<div className="flex h-80 w-full items-center gap-x-5">
			<ImageUploadBox aomInfoArr={aomImageArr} focusedIdx={foucsedIdx} />
			<AOMImageList
				aomInfoArr={aomImageArr}
				focusedIdx={foucsedIdx}
				setFocusedIdx={setFocusedIdx}
			/>
		</div>
	)
}
