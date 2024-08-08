import { PhoneNumberButton } from "./phone-number-button"
import { ReservationButton } from "./reservation-button"

type ReservationListPT = {
	shopId: number
}
export function ButtonList({ shopId }: ReservationListPT) {
	return (
		<div className="flex gap-6">
			<ReservationButton shopId={shopId} />
			<PhoneNumberButton />
		</div>
	)
}
