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
			icon="whishFull"
			className={cn(
				isLiked
					? "text-White drop-shadow-[0_0_1px_rgba(0,0,0,0.9)]"
					: "text-Black drop-shadow-[0_0_1px_rgba(0,0,0,0.9)]",
			)}
			onClick={() => {
				mutate({ shopLiked: !isLiked ?? false })
			}}
		/>
	)
}
