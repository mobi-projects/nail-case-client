import { MANAGER_BASE, MANAGER_SCHEDULE } from "./routing-path"

export const LABEL_LIST_FOR_MANAGER_BASE_TOOLBAR = ["홈", "일정"] as const
export const PATH_LIST_FOR_MANAGER_BASE_TOOLBAR = [
	MANAGER_BASE,
	MANAGER_SCHEDULE,
] as const

export const LABEL_LIST_FOR_MANAGER_BASE_MYSHOP_TOOLBAR = [
	"홈",
	"소식",
	"사진",
	"리뷰",
	"통계",
] as const

export const LABEL_LIST_FOR_CUSTOMER_BASE_TOOLBAR = ["홈"] as const
