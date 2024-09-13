"use client"
import type { Dispatch, SetStateAction } from "react"
import { useRef } from "react"

import AddingBox from "./adding-box"
import { useHandleRegisterShopImages } from "./image-form.hook"
import PreviewList from "./preview-list"

type ImageFormPT = {
	imageFileArr: Array<File>
	setImageFileArr: Dispatch<SetStateAction<Array<File>>>
	maxCount: number
}

export default function ImageForm({
	maxCount,
	setImageFileArr,
	imageFileArr,
}: ImageFormPT) {
	const { onClickDeleteIcon, onUploadFile, previewSrcArr } =
		useHandleRegisterShopImages(imageFileArr, setImageFileArr, maxCount)
	const hiddenInputRef = useRef<HTMLInputElement>(null)
	const onHandleClick = () => hiddenInputRef.current?.click()

	return (
		<div className="scrollbar-none relative flex h-56 w-full items-center gap-[10px] overflow-x-auto overflow-y-hidden whitespace-nowrap">
			<AddingBox
				ref={hiddenInputRef}
				onClick={onHandleClick}
				onUploadFile={onUploadFile}
			/>
			<PreviewList {...{ previewSrcArr, onClickDeleteIcon }} />
		</div>
	)
}
