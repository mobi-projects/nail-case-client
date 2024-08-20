import { ButtonList } from "./button-list/indest"
import { useScroll } from "./scroll-context"
import ShopInformation from "./shop-information"

type CustomerShopContentPT = {
	shopId: number
	phoneNumber: string
}

export default function CustomerShopContent({
	shopId,
	phoneNumber,
}: CustomerShopContentPT) {
	const { shopInfoRef } = useScroll()

	return (
		<div className="flex w-full flex-col">
			<div ref={shopInfoRef} className="flex w-full flex-col gap-5 pt-8">
				<ShopInformation />
				<ButtonList shopId={shopId} phoneNumber={phoneNumber} />
			</div>
		</div>
	)
}
