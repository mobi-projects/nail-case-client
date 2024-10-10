import type { TResGetShop } from "@/util/api-v2/get-shop-by-id"

import { ButtonList } from "./button-list/indest"
import ShopInformation from "./shop-information"
import ShopAom from "./shop-information/shop-aom"

export type CustomerShopContentPT = {
	shopId: number
	data: TResGetShop
	homeRef: React.RefObject<HTMLDivElement>
	aomRef: React.RefObject<HTMLDivElement>
}

export default function CustomerShopContent({
	shopId,
	data,
	homeRef,
	aomRef,
}: CustomerShopContentPT) {
	return (
		<div className="flex w-full flex-col gap-6 pb-10 pt-8">
			<div ref={homeRef}>
				<ShopInformation data={data} />
			</div>
			<ButtonList shopId={shopId} phone={data.phone} shopName={data.shopName} />

			<div ref={aomRef}>
				<ShopAom shopId={shopId} />
			</div>
		</div>
	)
}
