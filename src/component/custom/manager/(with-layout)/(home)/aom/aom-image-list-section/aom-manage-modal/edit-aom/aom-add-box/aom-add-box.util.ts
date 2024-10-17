import { toast } from "sonner"

import type { TResAOM } from "@/util/api/list-monthly-art"

/** 업로드 가능한 최대 이미지 갯수 반환 함수 0~10까지 */
export const getMaxUploadCnt = (arr: TResAOM, threshold: number) => {
	if (arr.length > threshold) throw new Error("업로드 한도 초과")
	return threshold - arr.length
}

/** 이미지업로드 가능여부 check함수 boolean반환 */
export const canUploadImages = (arr: TResAOM, threshold: number) => {
	const maxCnt = getMaxUploadCnt(arr, threshold)
	return maxCnt !== 0
}

/** 새로추가된 이미지 개수가 업로드 가능한 이미지 최대개수보다 작은지 판단 작다면 업로드가능 => true반환 */
export const isNewImageArrLessThanMaxCnt = (
	prevImageArr: TResAOM,
	newImages: FileList,
) => {
	const maxCnt = getMaxUploadCnt(prevImageArr, 10)
	const uploadImageCnt = newImages.length
	return maxCnt >= uploadImageCnt
}
/** total upload된 image개수가  max(10개) 이상일때 handler함수 */
export const handleExceedMaxCnt = () => {
	return toast.error("최대 업로드 개수를 초과했습니다.")
}

/** FileList 를 배열로 변환 & 원본 file 객체 저장 */
export const createFileListToArr = (newImages: FileList) => {
	const generateImageId = () => Math.floor(Math.random() * 100000)
	return Array.from(newImages).map((file) => ({
		imageUrl: URL.createObjectURL(file),
		imageId: generateImageId(),
		file,
	}))
}
