import { getCookie } from "cookies-next"
import Image from "next/image"
import { useRouter } from "next/navigation"

import PromotionImage from "@/../public/asset/nail-image-01.jpg"
import NTIcon from "@/component/common/nt-icon"
import { cn } from "@/config/tailwind"
import { REFRESH_TOKEN } from "@/constant/auth-key"
import { COMMON_SIGN } from "@/constant/routing-path"
import type { TPopularShop } from "@/util/api-v2/get-top-popular-shops"

import { ShopName } from "./shop-name"

type PopularShopCardPT = {
	shop: TPopularShop
}

export function PopularShopCard({ shop }: PopularShopCardPT) {
	return (
		<div className="flex h-fit w-fit flex-col gap-[13px]">
			<ShopName shop={shop} />
			<div className="group relative z-10 h-[264px] w-[384px] cursor-pointer rounded-[26px] bg-Gray40">
				<Image
					src={shop.shopImageUrl || PromotionImage}
					alt={"추천네일샵 이미지"}
					fill
					className="rounded-[26px]"
					sizes="384px"
				/>
				<NTIcon
					icon="like"
					className={cn(
						"absolute right-3 top-3 h-6 w-6",
						shop.likedByUser ? "text-PY80" : "text-White/80",
					)}
				/>
				<ShopHoverInfo shop={shop} />
			</div>
		</div>
	)
}

function ShopHoverInfo({ shop }: PopularShopCardPT) {
	const isLoggedIn = !!getCookie(REFRESH_TOKEN)
	const router = useRouter()
	return (
		<div
			onClick={() => {
				if (isLoggedIn) {
					router.push(`shop/${shop.shopId}`)
				} else {
					router.push(`${COMMON_SIGN}/member`)
				}
			}}
			className="absolute inset-0 flex flex-col justify-between rounded-[26px] bg-gradient-to-tr from-Black/50 to-Gray30 py-[19px] pl-[29px] text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100"
		>
			<div className="pt-[10]">
				<div className="text-Headline01 text-PY100">{shop.shopName}</div>
			</div>
			<div className="hover:text-PY80">{`예약하러가기 >`}</div>
		</div>
	)
}
