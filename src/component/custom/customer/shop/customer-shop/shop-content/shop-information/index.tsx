import type { TResGetShop } from "@/util/api-v2/get-shop-by-id"

import LoactionCard from "./shop-details/location"
import NoticeCard from "./shop-details/notice"
import PriceCard from "./shop-details/price"
import WorkHoursCard from "./shop-details/work-hour"

export type ShopInformaionPT = { data: TResGetShop }
export default function ShopInformation({ data }: ShopInformaionPT) {
	return (
		<div className="flex w-full justify-between gap-7 px-2 pb-8">
			<WorkHoursCard workHours={data.workHours} />
			<LoactionCard data={data} />
			<NoticeCard />
			<PriceCard priceImages={data.priceImages} />
		</div>
	)
}
