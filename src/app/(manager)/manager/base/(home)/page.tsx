import ManagerBaseHomeBanner from "@/component/custom/manager/base/home/00"
import ReservationCard from "@/component/custom/manager/base/home/01"
import ReservationForm from "@/component/custom/manager/base/home/02"
import CardListForm from "@/component/custom/manager/base/home/03"

export default function ManagerBaseHome() {
	return (
		<div className="flex flex-col gap-[40px]">
			<ManagerBaseHomeBanner />
			<div className="flex flex-col gap-[20px]">
				<p className="text-Title03 text-Gray100">
					오늘 하루 예약 일정을 살펴볼게요.
				</p>
				<ReservationCard />
			</div>
			<ReservationForm />
			<Divider />
			<CardListForm />
		</div>
	)
}

function Divider() {
	return (
		<div className="h-[12px] w-full">
			<div className="absolute left-0 h-[12px] w-full border border-b-PB50/40 border-t-PB50/40 bg-White" />
		</div>
	)
}
