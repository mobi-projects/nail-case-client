import type { TResGetShopInfo } from "@/util/api_v2/get-shop-Info"

type InfoCardFormPT = {
	InfoData: TResGetShopInfo
}
export function LocationForm({ InfoData }: InfoCardFormPT) {
	return <div className="mt-[20px] px-[25px]">{InfoData.address}</div>
}
