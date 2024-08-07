import type { TResGetShopInfo } from "@/util/api-v2/get-shop-info"

type InfoCardFormPT = {
	infoData: TResGetShopInfo
}
export function LocationForm({ infoData }: InfoCardFormPT) {
	return <div className="mt-[20px] px-[25px]">{infoData.address}</div>
}
