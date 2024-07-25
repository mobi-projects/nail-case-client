"use client"
import Image from "next/image"
import type { ChangeEvent, Dispatch, SetStateAction } from "react"
import { useRef, useState } from "react"

import { isNull } from "@/util/common/type-guard"

type ImageFormPT = {
	setImageFileArr: Dispatch<SetStateAction<Array<File>>>
	maxCount: number
}

export default function ImageForm({ maxCount, setImageFileArr }: ImageFormPT) {
	const [previewArr, setPreviewArr] = useState<Array<string>>([])
	const hiddenFileInput = useRef<HTMLInputElement>(null)

	const handleClick = () => hiddenFileInput.current?.click()

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
			setPreviewArr((prev) => {
				const _prev = [...prev, fileRead.result as string]
				if (_prev.length > maxCount) _prev.shift()
				return _prev
			})
		}
	}

	return (
		<div className="h-[180px] w-full gap-[20px]">
			<div className="scrollbar relative flex h-full w-full flex-nowrap gap-2 overflow-x-auto overflow-y-hidden whitespace-nowrap">
				<div
					className="flex aspect-square h-full cursor-pointer flex-col items-center justify-center rounded-[12px] border border-Gray20 active:bg-Gray10"
					onClick={handleClick}
				>
					<p className="text-center text-Headline01 font-Light text-Gray30">
						+
					</p>
					<input
						type="file"
						accept="image/png,image/jpeg,image/jpg,image/webp"
						ref={hiddenFileInput}
						onChange={onUploadFile}
						className="hidden"
					/>
				</div>

				{previewArr.map((preview, idx) => {
					return (
						<div
							key={idx}
							className="relative flex aspect-square h-full shrink-0 items-center justify-center overflow-hidden rounded-[12px] border border-Gray20"
						>
							<Image
								src={preview}
								alt="preview"
								fill
								className="object-cover"
							/>
						</div>
					)
				})}
			</div>
		</div>
	)
}
