import { PhoneNumberButton } from "./phone-number-button"
import { ReservationButton } from "./reservation-button"

type ReservationListPT = {
	shopId: number
	phone: string
	shopName: string
}
export function ButtonList({ shopId, phone, shopName }: ReservationListPT) {
	return (
		<div className="flex gap-6">
			<ReservationButton shopId={shopId} />
			<PhoneNumberButton phone={phone} shopName={shopName} />
		</div>
	)
}
