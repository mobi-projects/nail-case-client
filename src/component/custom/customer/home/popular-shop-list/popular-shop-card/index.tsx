import { getCookie } from "cookies-next"
import Image from "next/image"
import { useRouter } from "next/navigation"

import PromotionImage from "@/../public/asset/nail-image-01.jpg"
import NTIcon from "@/component/common/nt-icon"
import { cn } from "@/config/tailwind"
import { REFRESH_TOKEN } from "@/constant/auth-key"
import { COMMON_SIGN } from "@/constant/routing-path"
import type { TPopularShop } from "@/util/api/get-top-popular-shops"

import { ShopName } from "./shop-name"

type PopularShopCardPT = {
	shop: TPopularShop
}

export function PopularShopCard({ shop }: PopularShopCardPT) {
	const isLoggedIn = !!getCookie(REFRESH_TOKEN)
	const router = useRouter()
	const handleRouting = () => {
		if (isLoggedIn) {
			router.push(`shop/${shop.shopId}`)
		} else {
			router.push(`${COMMON_SIGN}/member`)
		}
	}
	return (
		<div className="flex h-fit w-fit flex-col gap-[13px]">
			<ShopName shop={shop} handleRouting={handleRouting} />
			<div className="group relative z-10 h-64 w-96 cursor-pointer rounded-[26px] md:h-[140px] md:rounded-2xl lg:h-48 lg:rounded-2xl xl:h-[250px] max-sm:h-[100px] max-sm:rounded-lg max-xl:w-[40dvw]">
				<Image
					src={shop.shopImageUrl || PromotionImage}
					alt={"추천네일샵 이미지"}
					fill
					className="rounded-[26px] md:rounded-2xl lg:rounded-2xl max-sm:rounded-lg"
					sizes="384px"
				/>
				<NTIcon
					icon="like"
					className={cn(
						"absolute right-3 top-3 h-6 w-6 max-md:right-2 max-md:top-2 max-md:h-4 max-md:w-4",
						shop.likedByUser ? "text-PY80" : "text-White/80",
					)}
				/>
				<ShopHoverInfo shop={shop} handleRouting={handleRouting} />
			</div>
		</div>
	)
}

type ShopHoverInfoPT = {
	shop: TPopularShop
	handleRouting: VoidFunction
}

function ShopHoverInfo({ shop, handleRouting }: ShopHoverInfoPT) {
	return (
		<div
			onClick={handleRouting}
			className="absolute inset-0 flex h-64 w-96 flex-col justify-between rounded-[26px] bg-gradient-to-tr from-Black/60 to-Black/10 py-[19px] pl-[29px] text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100 md:h-[140px] md:rounded-2xl lg:h-48 lg:rounded-2xl xl:h-[250px] max-sm:h-[100px] max-sm:rounded-lg max-xl:w-[40dvw]"
		>
			<div className="pt-[10]">
				<div className="text-Headline01 text-PY100 max-md:text-[14px]">
					{shop.shopName}
				</div>
			</div>
			<div className="hover:text-PY80 max-md:text-[12px]">{`예약하러가기 >`}</div>
		</div>
	)
}
