import Image from "next/image"

import PromotionImage from "@/../public/asset/nail-image-01.jpg"
import NTIcon from "@/component/common/nt-icon"
import type { TPopularShop } from "@/util/api-v2/get-top-popular-shops"

import { ShopName } from "./shop-name"

type PopularShopCardPT = {
	shop: TPopularShop
}

export function PopularShopCard({ shop }: PopularShopCardPT) {
	return (
		<div className="flex h-fit w-fit flex-col gap-[13px]">
			<ShopName shop={shop} />
			<div className="relative z-10 h-[264px] w-[384px] rounded-[26px] bg-Gray40">
				<Image
					src={shop.shopImageUrl || PromotionImage}
					alt={"추천네일샾 이미지"}
					fill
					className="rounded-[26px]"
					sizes="384px"
				/>
				<NTIcon
					icon="like"
					className="absolute right-3 top-3 h-8 w-8 cursor-pointer text-White/80"
				/>
			</div>
		</div>
	)
}
