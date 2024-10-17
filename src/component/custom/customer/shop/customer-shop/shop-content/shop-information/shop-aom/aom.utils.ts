import type { TResAOM } from "@/util/api-v2/list-monthly-art"

export const hasAOMImages = (arr: TResAOM) => {
	return arr.length !== 0
}
