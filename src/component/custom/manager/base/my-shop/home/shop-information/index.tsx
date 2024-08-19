import AOM from "../aom"

import ReservationRequirements from "./reservation-requirements"
import ShopDetails from "./shop-details"

type ShopInformation = { shopId: number }
export default function ShopInformation({ shopId }: ShopInformation) {
	return (
		<div>
			<div className="flex min-h-[586px] w-full justify-between px-2 py-5">
				<div className="flex flex-col gap-[20px]">
					<p className="text-Title03">내 샵 정보</p>
					<ShopDetails />
				</div>
				<div className="flex flex-col gap-[20px]">
					<p className="text-Title03">필수 예약 사항</p>
					<ReservationRequirements />
				</div>
			</div>
			<div className="flex flex-col gap-[20px] pb-20">
				<p className="text-Title03">이달의 아트</p>
				<AOM shopId={shopId} />
			</div>
		</div>
	)
}
