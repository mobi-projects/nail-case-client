import type { Dispatch, SetStateAction } from "react"

import NTIcon from "@/component/common/nt-icon"
import type { TResAOM } from "@/util/api/list-monthly-art"

import { useUploadAOMImages } from "./aom-add-box.hook"

type AOMAddBoxPT = {
	aomInfoArr: TResAOM
	setPreviewImageArr: Dispatch<SetStateAction<TResAOM>>
}

export function AOMAddBox({ aomInfoArr, setPreviewImageArr }: AOMAddBoxPT) {
	const { onChangeAddImageBox } = useUploadAOMImages()
	return (
		<div className="relative flex h-24 w-24 cursor-pointer flex-col items-center justify-center rounded-lg border border-Gray30 bg-White transition-all hover:scale-105 hover:bg-Gray10 max-lg:h-20 max-lg:w-20">
			<NTIcon icon="camera" className="h-6 w-6 text-Gray40" />
			<input
				type="file"
				multiple
				accept="image/png,image/jpeg,image/jpg,image/webp"
				onChange={(e) => onChangeAddImageBox(e, aomInfoArr, setPreviewImageArr)}
				className="absolute top-0 h-full w-full opacity-0"
			/>
			<p className="text-Body02 text-Gray50">
				<span className="text-PB80">{aomInfoArr.length}</span>/10
			</p>
		</div>
	)
}
