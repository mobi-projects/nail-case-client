"use client"
import NTIcon from "@/component/common/nt-icon"
import type { TResGetShop } from "@/util/api/get-shop-by-id"

import { ButtonList } from "./button-list"
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
		<div className="w-full max-xl:px-6">
			<ButtonList shopId={shopId} phone={data.phone} shopName={data.shopName} />
			<div className="flex w-full flex-col gap-6 pt-8">
				<div className="text-Title01 text-PB80 lg:text-[22px] max-md:text-[20px]">
					매장 정보
				</div>
				<ShopInformation data={data} />
			</div>
			<div className="w-full flex-col pt-2">
				<div className="flex items-center pb-8">
					<div className="text-Title01 text-PB80 lg:text-[22px] max-md:text-[20px]">
						이달의 아트
					</div>
					<NTIcon
						icon="art"
						className="text-Gray70 lg:h-7 lg:w-7 max-md:h-6 max-md:w-6"
					/>
				</div>
				<ShopAom shopId={shopId} />
			</div>
		</div>
	)
}
