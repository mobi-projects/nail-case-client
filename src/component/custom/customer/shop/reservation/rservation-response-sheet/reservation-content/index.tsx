import type { TReqReservationForm } from "@/util/api/post-register-reservation"

import ContentBody from "./content-body"
import ContentHeader from "./content-header"

type TReservationContent = {
	newReservation: TReqReservationForm
}

export default function ReservationContent({
	newReservation,
}: TReservationContent) {
	return (
		<div className="grid h-3/5 w-3/5 grid-rows-[1fr_1.5px_2fr] items-center rounded-[26px] bg-Gray90 p-[19px] lg:w-[75%] lg:p-2 max-md:w-[80dvw] max-md:grid-rows-[auto_1.5px_1fr]">
			<ContentHeader newReservation={newReservation} />
			<hr className="h-[1.5px] w-full border-Gray70" />
			<ContentBody newReservation={newReservation} />
		</div>
	)
}
