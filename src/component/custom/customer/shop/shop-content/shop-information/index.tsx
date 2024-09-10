import type { CustomerShopContentPT } from ".."

import ShopAom from "./shop-aom"
import ShopDetails from "./shop-details"

export default function ShopInformation({
	shopId,
	data,
}: CustomerShopContentPT) {
	return (
		<div>
			<div className="flex min-h-[586px] w-full justify-between gap-2 px-2 py-5">
				<div className="flex w-full flex-col items-center gap-9">
					<p className="text-Title03 font-SemiBold">내 샵 정보</p>
					<ShopDetails shopInfoData={data} />
				</div>
				<div className="flex w-full flex-col items-center gap-9">
					<p className="text-Title03 font-SemiBold">이달의 아트</p>
					<ShopAom shopId={shopId} />
				</div>
			</div>
		</div>
	)
}
