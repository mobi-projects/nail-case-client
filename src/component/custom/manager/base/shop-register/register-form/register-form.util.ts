import { DAY_OF_WEEKS_KOR, DEFAULT_TIMESTAMP } from "./register-form.constant"
import type { TWorkHour } from "./register.form.type"

export const initWorkHours = (): TWorkHour[] => {
	return DAY_OF_WEEKS_KOR.map((_, idx) => ({
		dayOfWeek: idx,
		startTime: DEFAULT_TIMESTAMP,
		endTime: DEFAULT_TIMESTAMP,
		isOpen: false,
	}))
}

export const getIsValidOpeningHours = (workHours: TWorkHour[]): boolean => {
	let result = true
	workHours.forEach(({ startTime, endTime, isOpen }) => {
		if (isOpen) result &&= startTime < endTime
	})
	return result
}
