import type { TResGetShopInfo } from "@/util/api-v2/get-shop-info"

type OpeningHourPT = TResGetShopInfo

export default function OpeningHours({ workHours }: OpeningHourPT) {
	/**미사용 변수 임시 콘솔 추후 삭제부탁드립니다. */
	console.log(workHours)
	return (
		<div className="flex flex-col py-2">
			<div className="pb-2 text-Headline02 text-Gray80">영업시간</div>
		</div>
	)
}
