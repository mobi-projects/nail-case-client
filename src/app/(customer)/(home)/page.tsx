import CardSlideListForm from "@/component/custom/customer/home/01"
import UsageForm from "@/component/custom/customer/home/02"
import ShopListForm from "@/component/custom/customer/home/03"

import { AroundShop, LikedShop } from "./mockData"

export default function CustomerHome() {
	return (
		<div className="flex h-fit flex-col pb-[7px]">
			<div className="h-[243px]"></div>
			<CardSlideListForm />
			<UsageForm />
			<hr className="w-full bg-Gray10" />
			<div className="flex h-fit w-full flex-col gap-[52px] pb-[33px] pt-[34px]">
				<ShopListForm listData={AroundShop} />
				<div
					className="absolute left-0 top-[171%] h-[12px] w-full border-y-[1px] bg-White"
					style={{ borderColor: "rgba(128, 214, 248, 0.4)" }}
				/>
				<ShopListForm listData={LikedShop} />
			</div>
		</div>
	)
}
