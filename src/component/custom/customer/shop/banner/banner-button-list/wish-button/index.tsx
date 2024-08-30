import NTIcon from "@/component/common/nt-icon"
import { cn } from "@/config/tailwind"
import { useShopToggleLiked } from "@/hook/use-shop-controller"

export function Wishbutton() {
	const { mutate, data } = useShopToggleLiked(1)

	console.log(data, "muatation함수의 return값 data")

	return (
		<NTIcon
			icon="whishFull"
			className={cn(
				data
					? "text-White drop-shadow-[0_0_1px_rgba(0,0,0,0.9)]"
					: "text-Black drop-shadow-[0_0_1px_rgba(0,0,0,0.9)]",
			)}
			onClick={() => {
				mutate({ shopLiked: false })
			}}
		/>
	)
}
