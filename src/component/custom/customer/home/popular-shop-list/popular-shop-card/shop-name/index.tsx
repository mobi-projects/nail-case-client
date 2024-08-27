import { useRouter } from "next/navigation"

import type { TPopularShop } from "@/util/api-v2/get-top-popular-shops"

type ShopNamePT = {
	shop: TPopularShop
}
export function ShopName({ shop }: ShopNamePT) {
	const router = useRouter()
	return (
		<div
			className="h-fit w-fit cursor-pointer pl-4 text-Callout text-Gray80"
			onClick={() => {
				router.push(`shop/${shop.shopId}`)
			}}
		>
			{shop.shopName}
		</div>
	)
}
