import { MANAGER_BASE, MANAGER_SCHEDULE } from "@/constant/routing-path"

export const getFocusedIdx = (pathName: string, toolPathArr: string[]) => {
	return toolPathArr.findIndex((toolPath) => toolPath === pathName)
}

export const getToolPathArr = (shopId: string) => {
	return [
		`${MANAGER_BASE}/${shopId}`,
		`${MANAGER_BASE}/${shopId}/${MANAGER_SCHEDULE}`,
	]
}
