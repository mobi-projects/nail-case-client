import { MANAGER_BASE, MANAGER_RESERVATIONS } from "@/constant/routing-path"

import type { TStatusExcludeCanceled } from "../../reservations/reservations.type"

export const getFocusedIdx = (pathName: string, toolPathArr: string[]) => {
	return toolPathArr.findIndex((toolPath) => toolPath === pathName)
}

export const getToolPathArr = (
	shopId: string,
	page: string = "1",
	status: TStatusExcludeCanceled = "PENDING",
) => {
	return [
		`${MANAGER_BASE}/${shopId}`,
		`${MANAGER_BASE}/${shopId}${MANAGER_RESERVATIONS}/${status}/${page}`,
	]
}
