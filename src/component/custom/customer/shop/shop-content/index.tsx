import ShopInfoCardList from "@/component/custom/customer/shop/04"

import { ButtonList } from "./button-list/indest"
import { useScroll } from "./scroll-context"

type CustomerShopContentPT = { shopId: number }

export default function CustomerShopContent({ shopId }: CustomerShopContentPT) {
	const { shopInfoRef } = useScroll()

	return (
		<div className="flex w-full flex-col">
			<div ref={shopInfoRef} className="flex w-full flex-col gap-5 pt-8">
				<ShopInfoCardList />
				<ButtonList shopId={shopId} />
			</div>
		</div>
	)
}
