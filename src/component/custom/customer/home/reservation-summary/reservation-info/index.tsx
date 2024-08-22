import type { TReservationInfo } from "@/util/api-v2/get-main-page-data"

import InfoButtons from "./info-buttons"
import InfoDetails from "./info-details"

type ReservationInfoPT = {
	recentReservation: TReservationInfo
}

export default function ReservationInfo({
	recentReservation,
}: ReservationInfoPT) {
	return (
		<div className="flex h-fit w-full flex-col gap-[17px]">
			<InfoDetails recentReservation={recentReservation} />
			<InfoButtons recentReservation={recentReservation} />
		</div>
	)
}
