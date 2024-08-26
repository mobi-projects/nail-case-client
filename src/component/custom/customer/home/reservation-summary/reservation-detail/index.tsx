import type { TReservationInfo } from "@/util/api-v2/get-main-page-data"

import NameNImage from "./name-n-image"
import TimeNOptions from "./time-n-options"

type ReservationInfoPT = {
	recentReservation: TReservationInfo
}

export default function ReservationDetail({
	recentReservation,
}: ReservationInfoPT) {
	const { shop } = recentReservation
	return (
		<div className="h-fit w-full">
			<div className="flex h-fit w-full gap-x-8">
				<NameNImage shop={shop} />
				<TimeNOptions recentReservation={recentReservation} />
			</div>
		</div>
	)
}
