import { useRouter } from "next/navigation"

import type { TPopularShop } from "@/util/api/get-top-popular-shops"

type ShopNamePT = {
	shop: TPopularShop
}
export function ShopName({ shop }: ShopNamePT) {
	const router = useRouter()
	return (
		<div
			className="h-fit w-fit cursor-pointer pl-4 text-Body01 font-SemiBold text-Gray80"
			onClick={() => {
				router.push(`shop/${shop.shopId}`)
			}}
		>
			{shop.shopName}
		</div>
	)
}
