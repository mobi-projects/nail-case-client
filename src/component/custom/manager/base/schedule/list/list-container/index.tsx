import {
	MOCKING_CONFIRMED_RESERVATION_LIST,
	MOCKING_PENDING_RESERVATION_LIST,
} from "./list-container.constant"
import ReservationList from "./reservation-list"

export default function ListContainer() {
	/** [TODO] 추후에 수정 */
	const pendingList = MOCKING_PENDING_RESERVATION_LIST
	/** [TODO] 추후에 수정 */
	const confirmedList = MOCKING_CONFIRMED_RESERVATION_LIST

	return (
		<div className="flex flex-col gap-[20px]">
			<ReservationList
				listTitle="대기 중인 예약"
				status="PENDING"
				reservationList={pendingList}
			/>
			<ReservationList
				listTitle="승인된 예약"
				status="CONFIRMED"
				reservationList={confirmedList}
			/>
		</div>
	)
}
