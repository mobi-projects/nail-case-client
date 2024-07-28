"use client"
import type { ChangeEvent, Dispatch, SetStateAction } from "react"
import { useRef, useState } from "react"

import { isNull } from "@/util/common/type-guard"

import AddingBox from "./adding-box"
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

		setImageFileArr((prev) => {
			const _prev = [...prev, recentlyFile]
			if (_prev.length > maxCount) _prev.shift()
			return _prev
		})

		const fileRead = new FileReader()
		fileRead.readAsDataURL(recentlyFile)
		fileRead.onload = () => {
			setPreviewSrcArr((prev) => {
				const _prev = [...prev, fileRead.result as string]
				if (_prev.length > maxCount) _prev.shift()
				return _prev
			})
		}
	}

	return (
		<div className="scrollbar relative flex h-[180px] w-full gap-[10px] overflow-x-auto overflow-y-hidden whitespace-nowrap">
			<AddingBox
				ref={hiddenInputRef}
				onClick={onHandleClick}
				onUploadFile={onUploadFile}
			/>
			<PreviewList previewSrcArr={previewSrcArr} />
		</div>
	)
}
