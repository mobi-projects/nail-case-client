"use client"
import { toast } from "sonner"

import NTIcon from "@/component/common/nt-icon"

import { RoutingButtonList } from "./routing-buuton-list"
import { Wishbutton } from "./wish-button"

type BannerButtonListPT = {
	shopId: number
}
export function BannerButtonList({ shopId }: BannerButtonListPT) {
	const handleShareClick = () => {
		const currentUrl = window.location.href
		toast.dismiss()
		navigator.clipboard.writeText(currentUrl).then(() => {
			toast.success("주소가 복사되었습니다")
		})
	}
	return (
		<div className="absolute top-12 flex h-fit w-full justify-between px-14 xl:top-6 max-md:px-6 max-lg:top-4">
			<RoutingButtonList />
			<div className="flex gap-3 max-md:gap-1">
				<Wishbutton shopId={shopId} />
				<NTIcon
					className="aspect-square w-7 text-White drop-shadow-[0_0_1px_rgba(0,0,0,0.9)] hover:cursor-pointer lg:h-8 lg:w-8 max-md:h-6 max-md:w-6"
					icon="share"
					onClick={handleShareClick}
				/>
			</div>
		</div>
	)
}
