import { STATUS_WITHOUT_CANCELED_ARR } from "../reservations.constant"
import type { TStatusExcludeCanceled } from "../reservations.type"

import CategoryBox from "./catagory-box"

type ReservationsHeaderPT = {
	status: TStatusExcludeCanceled
}

export default function ReservationsHeader({
	status: curStatus,
}: ReservationsHeaderPT) {
	return (
		<div className="mt-10 flex w-full items-center justify-between pb-8">
			{STATUS_WITHOUT_CANCELED_ARR.map((status, idx) => (
				<CategoryBox
					status={status}
					key={status}
					isClicked={STATUS_WITHOUT_CANCELED_ARR[idx] === curStatus}
				/>
			))}
		</div>
	)
}
