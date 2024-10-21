import type { TResGetShop } from "@/util/api/get-shop-by-id"

import LoactionCard from "./shop-details/location"
import NoticeCard from "./shop-details/notice"
import PriceCard from "./shop-details/price"
import WorkHoursCard from "./shop-details/work-hour"

export type ShopInformaionPT = { data: TResGetShop }
export default function ShopInformation({ data }: ShopInformaionPT) {
	return (
		<div className="flex w-full justify-evenly gap-7 px-2 pb-8 lg:grid lg:grid-cols-2 lg:grid-rows-2 lg:justify-items-center xl:grid xl:grid-cols-2 xl:grid-rows-2 xl:content-center xl:justify-items-center max-xl:flex-wrap">
			<WorkHoursCard workHours={data.workHours} />
			<LoactionCard data={data} />
			<NoticeCard />
			<PriceCard priceImages={data.priceImages} />
		</div>
	)
}
