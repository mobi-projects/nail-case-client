import type { ChangeEvent, Dispatch, SetStateAction } from "react"

import type { TResAOM } from "@/util/api/list-monthly-art"
import { isNull } from "@/util/common/type-guard"

import {
	canUploadImages,
	createFileListToArr,
	handleExceedMaxCnt,
	isNewImageArrLessThanMaxCnt,
} from "./aom-add-box.util"
/**
 * - 이미지 upload 핸들러 hook 함수
 * - case : 추가된 이미지가 없거나 이미 최대치만큼 이미지가 있을경우 => 함수종료
 * - case : 새로 추가한 이미지 개수가 최대용량 초과할경우 => toast 메세지
 * - case : 예외사항을 모두 통과하면 기존 이미지 배열에 업로드한 이미지 정보 추가
 */
export const useUploadAOMImages = () => {
	const onChangeAddImageBox = (
		e: ChangeEvent<HTMLInputElement>,
		arr: TResAOM,
		setPreviewImageArr: Dispatch<SetStateAction<TResAOM>>,
	) => {
		if (!canUploadImages(arr, 10) || isNull(e.target.files)) return
		if (!isNewImageArrLessThanMaxCnt(arr, e.target.files))
			return handleExceedMaxCnt()
		addNewImagesToAOMArr(e.target.files, setPreviewImageArr)
	}

	/** 새로 업로드한 이미지를 기존 이미지배열에 추가 */
	const addNewImagesToAOMArr = (
		newImages: FileList,
		setPreviewImageArr: Dispatch<SetStateAction<TResAOM>>,
	) => {
		const newImageArr = createFileListToArr(newImages)
		setPreviewImageArr((prevArr) => [...prevArr, ...newImageArr])
	}

	return { onChangeAddImageBox }
}
