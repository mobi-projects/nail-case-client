import type { Dispatch, SetStateAction } from "react"

import { ModalBody } from "@/component/common/nt-modal"
import { cn } from "@/config/tailwind"
import type { TResAOM } from "@/util/api/list-monthly-art"

import {
	getSlideCss,
	isAOMImageArrayFull,
	isAOMImageArryEmpty,
} from "../aom-manage-modal.util"

import { AOMAddBox } from "./aom-add-box"
import AOMPrecautions from "./aom-precautions"
import { AOMPreViewBox } from "./aom-preview-box"

type EditAOMPT = {
	isGuideVisible: boolean
	previewImageArr: TResAOM
	setPreviewImageArr: Dispatch<SetStateAction<TResAOM>>
	keepIdArr: Array<number>
	removeIdArr: Array<number>
}
export function EditAOM({
	isGuideVisible,
	previewImageArr,
	setPreviewImageArr,
	keepIdArr,
	removeIdArr,
}: EditAOMPT) {
	const slideCss = getSlideCss(isGuideVisible)

	return (
		<ModalBody
			className={cn(
				"scrollbar-none absolute left-0 top-0 flex h-full w-full transform flex-col justify-start gap-y-2 pt-5",
				slideCss,
			)}
		>
			<p className="text-Title03 font-SemiBold max-md:text-[16px]">사진 등록</p>
			<div className="scrollbar-none flex h-fit w-full flex-wrap gap-7 rounded-lg border border-Gray40 bg-Gray10 p-6 md:gap-3 lg:gap-4 max-sm:gap-2">
				{!isAOMImageArryEmpty(previewImageArr)
					? previewImageArr.map((info) => (
							<AOMPreViewBox
								key={info.imageId}
								aomInfo={info}
								setPreviewImageArr={setPreviewImageArr}
								keepIdArr={keepIdArr}
								removeIdArr={removeIdArr}
							/>
						))
					: null}
				{isAOMImageArrayFull(previewImageArr, 10) ? null : (
					<AOMAddBox
						aomInfoArr={previewImageArr}
						setPreviewImageArr={setPreviewImageArr}
					/>
				)}
			</div>
			<AOMPrecautions />
		</ModalBody>
	)
}
