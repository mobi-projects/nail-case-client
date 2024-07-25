export const MAXIMUM_HOUR = 1704121199 // kst 기준, 2024년 1월 1일 23시 59분 59초
export const MINIMUM_HOUR = 1704034800 // kst 기준, 2024년 1월 1일 00시 00분 00초
export const OPENING_HOURS_INIT_STATE = {
	startTime: 1704078000, // kst 기준, 2024년 1월 1일 12시 00분 00초 (정오)
	endTime: 1704078000, // kst 기준, 2024년 1월 1일 12시 00분 00초 (정오)
	isDisable: false,
} as const
