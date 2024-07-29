"use client"
import type { ChangeEvent, Dispatch, SetStateAction } from "react"
import { useRef, useState } from "react"

import { isNull } from "@/util/common/type-guard"

import AddingBox from "./adding-box"
import { deleteElemOneByIdx, pushNewElemIntoLIFOArr } from "./image-form.util"
import PreviewList from "./preview-list"

type ImageFormPT = {
	setImageFileArr: Dispatch<SetStateAction<Array<File>>>
	maxCount: number
}

export default function ImageForm({ maxCount, setImageFileArr }: ImageFormPT) {
	const [previewSrcArr, setPreviewSrcArr] = useState<Array<string>>([])
	const hiddenInputRef = useRef<HTMLInputElement>(null)

	const onHandleClick = () => hiddenInputRef.current?.click()
	const onUploadFile = (e: ChangeEvent<HTMLInputElement>) => {
		const uploadedFiles = e.target.files
		if (isNull(uploadedFiles)) return
		const recentlyFile = uploadedFiles[0]
		setImageFileArr((prev) =>
			pushNewElemIntoLIFOArr<File>(prev, recentlyFile, maxCount),
		)
		const fileRead = new FileReader()
		fileRead.readAsDataURL(recentlyFile)
		fileRead.onload = () => {
			setPreviewSrcArr((prev) =>
				pushNewElemIntoLIFOArr<string>(
					prev,
					fileRead.result as string,
					maxCount,
				),
			)
		}
	}
	const onUnloadFile = (idx: number) => {
		setImageFileArr((prev) => deleteElemOneByIdx(prev, idx))
		setPreviewSrcArr((prev) => deleteElemOneByIdx(prev, idx))
	}

	return (
		<div className="scrollbar relative flex h-[180px] w-full gap-[10px] overflow-x-auto overflow-y-hidden whitespace-nowrap">
			<AddingBox
				ref={hiddenInputRef}
				onClick={onHandleClick}
				onUploadFile={onUploadFile}
			/>
			<PreviewList {...{ previewSrcArr, onUnloadFile }} />
		</div>
	)
}
