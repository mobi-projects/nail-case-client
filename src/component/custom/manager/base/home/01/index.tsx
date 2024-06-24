import ReservationPendingCard from "./01"
import ReservationConfirmedCard from "./02"

export default function ReservationPanelForm() {
	return (
		<div className="flex justify-between gap-6">
			<ReservationPendingCard />
			<ReservationConfirmedCard />
		</div>
	)
}
