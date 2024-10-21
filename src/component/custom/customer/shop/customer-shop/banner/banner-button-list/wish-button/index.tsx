import NTIcon from "@/component/common/nt-icon"
import { cn } from "@/config/tailwind"
import { useShopById, useShopToggleLiked } from "@/hook/use-shop-controller"

type WishbuttonPT = { shopId: number }
export function Wishbutton({ shopId }: WishbuttonPT) {
	const { data } = useShopById(shopId)
	const { mutate } = useShopToggleLiked(shopId)
	const isLiked = data?.likedByUser

	return (
		<NTIcon
			icon="like"
			className={cn(
				isLiked ? "text-PY50" : "text-White",
				"cursor-pointer drop-shadow-[0_0_1px_rgba(0,0,0,0.9)] lg:h-8 lg:w-8 max-md:h-6 max-md:w-6",
			)}
			onClick={() => {
				mutate()
			}}
		/>
	)
}
