import {
	MANAGER_BASE,
	MANAGER_CHATTING,
	MANAGER_RESERVATIONS,
} from "./routing-path"

export const LABEL_LIST_FOR_MANAGER_BASE_TOOLBAR = [
	"홈",
	"예약 관리",
	"채팅",
] as const
export const PATH_LIST_FOR_MANAGER_BASE_TOOLBAR = [
	MANAGER_BASE,
	MANAGER_RESERVATIONS,
	MANAGER_CHATTING,
] as const

export const LABEL_LIST_FOR_CUSTOMER_BASE_TOOLBAR = ["홈"] as const
