import { createShopInfo, tmpFetch } from "@/mook"
import type { TShopInfo } from "@/type"

export const getShopInfo = async () => {
	const response = await tmpFetch<TShopInfo>(createShopInfo())
	return response
}
