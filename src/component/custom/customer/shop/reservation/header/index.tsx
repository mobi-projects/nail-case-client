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
			<div className="h-[30px] w-full" />
			<CategoryNAddress {...{ category, address }} />
			<div className="h-[6px] w-full" />
			<ShopName {...{ shopName }} />
			<div className="h-[10px] w-full" />
			<NoticeList />
		</header>
	)
}
