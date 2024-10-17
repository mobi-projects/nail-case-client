import type { TResAOM } from "@/util/api/list-monthly-art"

export const hasAOMImages = (arr: TResAOM) => {
	return arr.length !== 0
}
