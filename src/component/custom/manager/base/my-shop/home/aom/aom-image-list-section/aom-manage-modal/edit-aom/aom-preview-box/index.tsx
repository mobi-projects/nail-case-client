import Image from "next/image"
import type { Dispatch, SetStateAction } from "react"

import NTIcon from "@/component/common/nt-icon"
import type { TAOMImage, TResAOM } from "@/util/api-v2/list-monthly-art"

import {
	filterImagesByIdx,
	handleOldImageRemoval,
} from "./aom-preview-box.util"

type AOMPreViewBoxPT = {
	aomInfo: TAOMImage
	setPreviewImageArr: Dispatch<SetStateAction<TResAOM>>
	keepIdArr: Array<number>
	removeIdArr: Array<number>
}
export function AOMPreViewBox({
	aomInfo,
	setPreviewImageArr,
	keepIdArr,
	removeIdArr,
}: AOMPreViewBoxPT) {
	const onClickDeleteIcon = () => {
		const curIdx = aomInfo.imageId
		setPreviewImageArr((prevArr) => filterImagesByIdx(prevArr, curIdx))
		handleOldImageRemoval(curIdx, keepIdArr, removeIdArr)
	}
	return (
		<div className="relative h-24 w-24 rounded-lg bg-White shadow-customGray80">
			<Image
				alt="미리보기"
				src={aomInfo.imageUrl}
				fill
				sizes="20vw"
				className="rounded-lg"
			/>
			<NTIcon
				icon="delete"
				onClick={onClickDeleteIcon}
				className="absolute right-0 top-0 h-4 w-4 -translate-y-1/2 translate-x-1/2 cursor-pointer rounded-full border border-White bg-Gray70 text-PY80 transition-all hover:border-transparent hover:bg-Gray80 hover:text-PY100"
			/>
		</div>
	)
}
