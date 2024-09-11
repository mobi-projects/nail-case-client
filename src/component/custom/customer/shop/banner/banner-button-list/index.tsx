import NTIcon from "@/component/common/nt-icon"
import { useModal } from "@/component/common/nt-modal/nt-modal.context"

import { ShareAddressModal } from "../../share-modal"

import { RoutingButtonList } from "./routing-buuton-list"
import { Wishbutton } from "./wish-button"
export function BannerButtonList() {
	const { onOpenModal } = useModal()

	const handleShareClick = () => {
		const currentUrl = window.location.href
		onOpenModal({
			children: <ShareAddressModal data={currentUrl} text={"URL이"} />,
			size: "exSmall",
			isX: false,
		})
	}
	return (
		<div className="z-10 flex h-8 w-full justify-between">
			<RoutingButtonList />
			<div className="flex gap-3">
				<Wishbutton />
				<NTIcon
					className="aspect-square w-7 text-White drop-shadow-[0_0_1px_rgba(0,0,0,0.9)] hover:cursor-pointer"
					icon="share"
					onClick={handleShareClick}
				/>
			</div>
		</div>
	)
}
