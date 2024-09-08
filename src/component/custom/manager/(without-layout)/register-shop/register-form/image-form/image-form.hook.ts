import { isNull } from "@/util/common/type-guard"
import { ChangeEvent, Dispatch, SetStateAction, useState } from "react"
import {
	canUploadImages,
	createFilesListToArr,
	deleteElemOneByIdx,
} from "./image-form.util"
import { toast } from "sonner"

/** shop관련 image 추가 삭제 hook */
export const useHandleRegisterShopImages = (
	imageFileArr: Array<File>,
	setImageFileArr: Dispatch<SetStateAction<Array<File>>>,
	maxCount: number,
) => {
	const [previewSrcArr, setPreviewSrcArr] = useState<Array<string>>([])
	const onUploadFile = (e: ChangeEvent<HTMLInputElement>) => {
		const uploadedFiles = e.target.files
		if (isNull(uploadedFiles)) return
		if (
			!canUploadImages(
				imageFileArr,
				createFilesListToArr(uploadedFiles),
				maxCount,
			)
		) {
			return toast.error("최대 5장의 사진만 등록할 수 있습니다.")
		}
		addNewImagesToArr(uploadedFiles, setImageFileArr)
		createPreviewUrls(uploadedFiles)
	}

	/** 기존 Image에 새로 등록한 image추가 */
	const addNewImagesToArr = (
		uploadFiles: FileList,
		setImageFileArr: Dispatch<SetStateAction<Array<File>>>,
	) => {
		setImageFileArr((prevArr) => {
			const upLoadFileArr = createFilesListToArr(uploadFiles)
			return [...prevArr, ...upLoadFileArr]
		})
	}

	/** FileList에서 이미지 url을 추출하는 함수 */
	const createPreviewUrls = (files: FileList) => {
		const fileArray = Array.from(files)
		fileArray.forEach((file) => {
			const reader = new FileReader()
			reader.readAsDataURL(file) // 파일을 Base64로 변환

			// 변환 완료 후 미리보기 URL 업데이트
			reader.onload = () => {
				if (reader.result) {
					setPreviewSrcArr((prev) => [...prev, reader.result as string])
				}
			}
		})
	}

	/** "X" 버튼 클릭 handler함수 해당 아이템 삭제 */
	const onClickDeleteIcon = (idx: number) => {
		setImageFileArr((prev) => deleteElemOneByIdx(prev, idx))
		setPreviewSrcArr((prev) => deleteElemOneByIdx(prev, idx))
	}

	return { onUploadFile, onClickDeleteIcon, previewSrcArr }
}
