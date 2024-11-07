import Chat from "./chat"
import { PhoneNumberButton } from "./phone-number-button"
import { ReservationButton } from "./reservation-button"

type ReservationListPT = {
	shopId: number
	phone: string
	shopName: string
}
export function ButtonList({ shopId, phone, shopName }: ReservationListPT) {
	return (
		<div className="grid w-full grid-cols-3 gap-6 pt-4 max-md:gap-2">
			<ReservationButton shopId={shopId} />
			<Chat shopId={shopId} />
			<PhoneNumberButton phone={phone} shopName={shopName} />
		</div>
	)
}
