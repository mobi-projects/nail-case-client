import type { TResGetShop } from "@/util/api-v2/get-shop-by-id"

import LoactionForm from "./shop-details/location"
import NoticeForm from "./shop-details/notice"
import PriceForm from "./shop-details/price"
import WorkHoursForm from "./shop-details/work-hour"

export type ShopInformaionPT = { data: TResGetShop }
export default function ShopInformation({ data }: ShopInformaionPT) {
	return (
		<div className="flex w-full justify-between gap-7 px-2 py-8">
			<WorkHoursForm workHours={data.workHours} />
			<LoactionForm data={data} />
			<NoticeForm />
			<PriceForm priceImages={data.priceImages} />
		</div>
	)
}
