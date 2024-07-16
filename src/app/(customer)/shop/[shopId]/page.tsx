import dynamic from "next/dynamic"

import CustomerShopBanner from "@/component/custom/customer/shop/01"
import { convertStringToInteger } from "@/util/common"

const CustomerShopContent = dynamic(
	() => import("@/component/custom/customer/shop/05/index"),
	{ ssr: false },
)

type CustomerShopPT = {
	params: {
		shopId: number
	}
}

export default function CustomerShop({ params }: CustomerShopPT) {
	return (
		<div className="h-full w-full">
			<CustomerShopBanner />
			<div className="mt-[32px] flex w-full flex-col">
				<div className="flex w-full flex-col gap-[20px]"></div>
				<CustomerShopContent shopId={convertStringToInteger(params.shopId)} />
			</div>
		</div>
	)
}
