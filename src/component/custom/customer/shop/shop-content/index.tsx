import type { TResGetShop } from "@/util/api-v2/get-shop-by-id"

import { ButtonList } from "./button-list/indest"
import ShopInformation from "./shop-information"
import ShopAom from "./shop-information/shop-aom"

export type CustomerShopContentPT = {
	shopId: number
	data: TResGetShop
}

export default function CustomerShopContent({
	shopId,
	data,
}: CustomerShopContentPT) {
	return (
		<div className="flex w-full flex-col gap-6 pb-10 pt-8">
			<ShopInformation data={data} />
			<ButtonList shopId={shopId} phone={data.phone} />
			<ShopAom shopId={shopId} />
		</div>
	)
}
