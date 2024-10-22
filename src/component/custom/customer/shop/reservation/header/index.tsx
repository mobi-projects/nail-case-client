import CategoryNAddress from "./category-and-address"
import IconButtonGroup from "./icon-button-group"
import NoticeList from "./notice-list"
import { ShopName } from "./shop-name"

type HeaderPT = {
	shopId: number
	category: string
	address: string
	shopName: string
}
export default function Header({
	shopId,
	category,
	address,
	shopName,
}: HeaderPT) {
	return (
		<header className="flex h-fit w-full flex-col">
			<IconButtonGroup {...{ shopId }} />
			<div className="h-[30px] w-full lg:h-4 max-md:h-2" />
			<CategoryNAddress {...{ category, address }} />
			<div className="h-[6px] w-full max-md:h-1" />
			<ShopName {...{ shopName }} />
			<div className="h-[10px] w-full lg:h-2 max-md:h-1" />
			<NoticeList />
		</header>
	)
}
