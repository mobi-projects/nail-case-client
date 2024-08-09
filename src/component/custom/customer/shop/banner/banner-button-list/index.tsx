import NTIcon from "@/component/common/nt-icon"
import { useModal } from "@/component/common/nt-modal/nt-modal.context"

import { RoutingButtonList } from "./routing-buuton-list"
import { ShareAddressModal } from "./share-modal"
import { Wishbutton } from "./wish-button"
export function BannerButtonList() {
	const { onOpenModal } = useModal()

	const handleShareClick = () => {
		onOpenModal({
			children: <ShareAddressModal />,
			size: "exSmall",
			isX: false,
		})
	}
	return (
		<div className="flex h-8 w-full justify-between">
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
