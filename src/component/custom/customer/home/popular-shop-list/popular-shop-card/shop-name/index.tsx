import type { TPopularShop } from "@/util/api/get-top-popular-shops"

type ShopNamePT = {
	shop: TPopularShop
	handleRouting: VoidFunction
}
export function ShopName({ shop, handleRouting }: ShopNamePT) {
	return (
		<div
			className="h-fit w-fit cursor-pointer pl-4 text-Body01 font-SemiBold text-Gray80 max-sm:pl-1 max-sm:text-[12px]"
			onClick={handleRouting}
		>
			{shop.shopName}
		</div>
	)
}
