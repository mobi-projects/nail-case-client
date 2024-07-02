import {
	MANAGER_BASE_CHATTING,
	MANAGER_BASE_HOME,
	MANAGER_BASE_MYSHOP_HOME,
	MANAGER_BASE_MYSHOP_PHOTO,
	MANAGER_BASE_MYSHOP_POST,
	MANAGER_BASE_MYSHOP_REVIEW,
	MANAGER_BASE_MYSHOP_STATISTICS,
	MANAGER_BASE_SCHEDULE_THIS_MONTH,
	MANAGER_BASE_SCHEDULE_THIS_WEEK,
	MANAGER_BASE_SCHEDULE_TODAY,
} from "./routing-path"

export const LABEL_LIST_FOR_MANAGER_BASE_TOOLBAR = [
	"홈",
	"일정",
	"채팅",
	"내 샵",
] as const
export const PATH_LIST_FOR_MANAGER_BASE_TOOLBAR = [
	MANAGER_BASE_HOME,
	MANAGER_BASE_SCHEDULE_THIS_MONTH,
	MANAGER_BASE_CHATTING,
	MANAGER_BASE_MYSHOP_HOME,
] as const

export const LABEL_LIST_FOR_MANAGER_BASE_MYSHOP_TOOLBAR = [
	"홈",
	"소식",
	"사진",
	"리뷰",
	"통계",
] as const
export const PATH_LIST_FOR_MANAGER_BASE_MYSHOP_TOOLBAR = [
	MANAGER_BASE_MYSHOP_HOME,
	MANAGER_BASE_MYSHOP_PHOTO,
	MANAGER_BASE_MYSHOP_POST,
	MANAGER_BASE_MYSHOP_REVIEW,
	MANAGER_BASE_MYSHOP_STATISTICS,
] as const
export const PATH_LIST_FOR_MANAGER_BASE_SCHEDULE_TOOLBAR = [
	MANAGER_BASE_SCHEDULE_THIS_MONTH,
	MANAGER_BASE_SCHEDULE_THIS_WEEK,
	MANAGER_BASE_SCHEDULE_TODAY,
]
