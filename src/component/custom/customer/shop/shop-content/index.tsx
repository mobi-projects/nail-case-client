import type { TResGetShop } from "@/util/api-v2/get-shop-by-id"

import { ButtonList } from "./button-list/indest"
import ShopInformation from "./shop-information"

export type CustomerShopContentPT = {
	shopId: number
	data: TResGetShop
}

export default function CustomerShopContent({
	shopId,
	data,
}: CustomerShopContentPT) {
	return (
		<div className="flex w-full flex-col gap-5 pb-10 pt-5">
			<ShopInformation shopId={shopId} data={data} />
			<ButtonList shopId={shopId} phone={data.phone} shopName={data.shopName} />
		</div>
	)
}
