import { useState } from "react"

import NTIcon from "@/component/common/nt-icon"

import { RoutingButtonList } from "./routing-buuton-list"
import { ShareAddressModal } from "./share-modal"
import { Wishbutton } from "./wish-button"
export function BannerButtonList() {
	const [isModalOpen, setIsModalOpen] = useState(false)

	const handleShareClick = () => {
		setIsModalOpen(true)
	}
	return (
		<div className="flex w-full justify-between">
			<RoutingButtonList />
			<div className="flex gap-3">
				<Wishbutton />
				<NTIcon
					className="aspect-square w-7 text-White drop-shadow-[0_0_1px_rgba(0,0,0,0.9)] hover:cursor-pointer"
					icon="share"
					onClick={handleShareClick}
				/>
				<ShareAddressModal
					isModalOpen={isModalOpen}
					setIsModalOpen={setIsModalOpen}
				/>
			</div>
		</div>
	)
}
