import { DAY_OF_WEEKS_KOR, DEFAULT_TIMESTAMP } from "./register-form.constant"
import type { TWorkHour } from "./register.form.type"

export const initWorkHours = (): TWorkHour[] => {
	return DAY_OF_WEEKS_KOR.map((_, idx) => ({
		dayOfWeek: idx,
		openTime: DEFAULT_TIMESTAMP,
		closeTime: DEFAULT_TIMESTAMP,
		isOpen: false,
	}))
}

export const getIsValidOpeningHours = (workHours: TWorkHour[]): boolean => {
	let result = true
	let cntClosedDays = 0
	workHours.forEach(({ openTime, closeTime, isOpen }) => {
		if (isOpen) result &&= openTime < closeTime
		else cntClosedDays++
	})
	if (cntClosedDays === 7) return false
	return result
}
/* 샵등록 api 호출 시, 요청에 포함할 FormData 생성*/
export const createRequestFrom = (
	shopName: string,
	address: string,
	telephone: number,
	workHours: Array<TWorkHour>,
	shopProfileFileArr: Array<File>,
	priceListFileArr: Array<File>,
): FormData => {
	const shopData = {
		shopName,
		address,
		phone: telephone,
		workHours,
	}
	const formData = new FormData()
	formData.append("shopData", JSON.stringify(shopData))
	shopProfileFileArr.forEach((file) => formData.append("profileImages", file))
	priceListFileArr.forEach((file) => formData.append("priceImages", file))
	return formData
}
