import ShopListForm from "@/component/custom/customer/home/03"

import { AroundShop, LikedShop } from "./mockData"

export default function CustomerBaseHome() {
	return (
		<div className="flex flex-col">
			<div>배너</div>
			<div className="flex">
				<div>진행 중인 네일</div>
				<div>다시 돌아보는 지난 네일</div>
			</div>
			<ShopListForm listData={AroundShop} />
			<ShopListForm listData={LikedShop} />
		</div>
	)
}
