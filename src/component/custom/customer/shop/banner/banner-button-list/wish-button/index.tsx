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
				isLiked
					? "text-White drop-shadow-[0_0_1px_rgba(0,0,0,0.9)]"
					: "text-PY50 drop-shadow-[0_0_1px_rgba(0,0,0,0.9)]",
				"cursor-pointer",
			)}
			onClick={() => {
				mutate({ shopLiked: !isLiked ?? false })
			}}
		/>
	)
}
