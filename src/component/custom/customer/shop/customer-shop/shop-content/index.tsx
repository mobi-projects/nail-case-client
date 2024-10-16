import NTIcon from "@/component/common/nt-icon"
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
		<>
			<div className="flex w-full flex-col gap-6 pt-8" key="home">
				<ShopInformation data={data} />
				<ButtonList
					shopId={shopId}
					phone={data.phone}
					shopName={data.shopName}
				/>
			</div>
			<div key="aom" className="w-full flex-col pt-8">
				<div className="flex pb-8">
					<div className="text-Title01 text-PB80">이달의 아트</div>
					<NTIcon icon="art" className="text-Black" />
				</div>
				<ShopAom shopId={shopId} />
			</div>
		</>
	)
}
