import { STATUS_WITHOUT_CANCELED_ARR } from "../reservations.constant"
import type { TStatusExcludeCanceled } from "../reservations.type"

import CategoryBox from "./catagory-box"
import MobileReservationSideBar from "./mobile-reservation-side-bar"

type ReservationsHeaderPT = {
	status: TStatusExcludeCanceled
}

export default function ReservationsHeader({
	status: curStatus,
}: ReservationsHeaderPT) {
	return (
		<div className="h-full w-full">
			<div className="mt-10 flex w-full items-center justify-between pb-8 max-lg:hidden">
				{STATUS_WITHOUT_CANCELED_ARR.map((status, idx) => (
					<CategoryBox
						status={status}
						key={status}
						isClicked={STATUS_WITHOUT_CANCELED_ARR[idx] === curStatus}
					/>
				))}
			</div>
			<MobileReservationSideBar />
		</div>
	)
}
