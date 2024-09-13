import { PhoneNumberButton } from "./phone-number-button"
import { ReservationButton } from "./reservation-button"

type ReservationListPT = {
	shopId: number
	phone: string
}
export function ButtonList({ shopId, phone }: ReservationListPT) {
	return (
		<div className="flex gap-6">
			<ReservationButton shopId={shopId} />
			<PhoneNumberButton phone={phone} />
		</div>
	)
}
