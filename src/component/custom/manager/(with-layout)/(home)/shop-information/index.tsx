import AOM from "../aom"

import ReservationRequirements from "./reservation-requirements"
import ShopDetails from "./shop-details"

type ShopInformation = { shopId: number }
export default function ShopInformation({ shopId }: ShopInformation) {
	return (
		<div className="max-lg:px-3">
			<div className="flex min-h-[586px] w-full justify-between px-2 py-5 lg:justify-evenly lg:gap-x-6 max-md:flex-col max-md:gap-y-6">
				<div className="flex min-h-[457px] flex-col gap-[20px]">
					<p className="text-Title03 md:text-[16px] max-sm:text-[14px]">
						내 샵 정보
					</p>
					<ShopDetails shopId={shopId} />
				</div>
				<div className="flex min-h-[442px] flex-col gap-[20px]">
					<p className="text-Title03 md:text-[16px] max-sm:text-[14px]">
						필수 예약 사항
					</p>
					<ReservationRequirements />
				</div>
			</div>

			<div className="ml-2 flex flex-col gap-[20px]">
				<p className="text-Title03 md:text-[16px] max-sm:text-[14px]">
					이달의 아트
				</p>
				<AOM shopId={shopId} />
			</div>
		</div>
	)
}
