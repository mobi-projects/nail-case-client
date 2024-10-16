import { toast } from "sonner"

import NTIcon from "@/component/common/nt-icon"

import { RoutingButtonList } from "./routing-buuton-list"
import { Wishbutton } from "./wish-button"

type BannerButtonListPT = {
	shopId: number
}
export function BannerButtonList({ shopId }: BannerButtonListPT) {
	const currentUrl = window.location.href
	const handleShareClick = () => {
		toast.dismiss()
		navigator.clipboard.writeText(currentUrl).then(() => {
			toast.success("주소가 복사되었습니다")
		})
	}
	return (
		<div className="absolute top-12 flex h-8 w-full justify-between px-14">
			<RoutingButtonList />
			<div className="flex gap-3">
				<Wishbutton shopId={shopId} />
				<NTIcon
					className="aspect-square w-7 text-White drop-shadow-[0_0_1px_rgba(0,0,0,0.9)] hover:cursor-pointer"
					icon="share"
					onClick={handleShareClick}
				/>
			</div>
		</div>
	)
}
