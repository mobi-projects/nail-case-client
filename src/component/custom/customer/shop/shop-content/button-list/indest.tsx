import { PhoneNumberButton } from "./phone-number-button"
import { ReservationButton } from "./reservation-button"

type ReservationListPT = {
	shopId: number
	phoneNumber?: string
}
export function ButtonList({ shopId, phoneNumber }: ReservationListPT) {
	return (
		<div className="flex gap-6">
			<ReservationButton shopId={shopId} />
			<PhoneNumberButton phoneNumber={phoneNumber} />
		</div>
	)
}
