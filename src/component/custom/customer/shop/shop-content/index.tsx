import type { TResGetShop } from "@/util/api-v2/get-shop-by-id"

import { ButtonList } from "./button-list/indest"
import ShopInformation from "./shop-information"
import ShopAom from "./shop-information/shop-aom"

export type CustomerShopContentPT = {
	shopId: number
	data: TResGetShop
	focusedIdx: number
}

export default function CustomerShopContent({
	shopId,
	data,
	focusedIdx,
}: CustomerShopContentPT) {
	const section = [
		<div className="flex w-full flex-col gap-6 pt-8" key="home">
			<ShopInformation data={data} />
			<ButtonList shopId={shopId} phone={data.phone} shopName={data.shopName} />
		</div>,
		<div key="aom" className="flex w-full pt-8">
			<ShopAom shopId={shopId} />
		</div>,
	]
	return section[focusedIdx]
}
