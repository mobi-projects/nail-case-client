import { getCookie } from "cookies-next"

import {
	MANAGER_BASE,
	MANAGER_CHATTING,
	MANAGER_RESERVATIONS,
} from "@/constant/routing-path"

export const getFocusedIdx = (pathName: string, shopId: string) => {
	const pathNameArr = pathName.split("/")

	let idx = -1
	if (pathNameArr.includes("reservations")) {
		idx = 1
	}
	if (pathName === `/manager/${shopId}`) {
		idx = 0
	}
	if (pathNameArr.includes("chat")) {
		idx = 2
	}
	return idx
}

export const getToolPathArr = () => {
	const shopId = getCookie("shopId")
	return [
		`${MANAGER_BASE}/${shopId}`,
		`${MANAGER_BASE}/${shopId}${MANAGER_RESERVATIONS}/PENDING/1`,
		`${MANAGER_BASE}/${shopId}${MANAGER_CHATTING}`,
	]
}
