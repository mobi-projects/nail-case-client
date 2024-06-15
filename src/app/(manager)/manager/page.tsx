"use client"

import { NoticeCard } from "@/component/custom/post/notice-card"
import ReservationConfirmedCard from "@/component/custom/reservation/reservation-confirmed"
import ReservationPendingCard from "@/component/custom/reservation/reservation-pending"

export default function Home() {
	return (
		<div className="flex flex-col gap-10 p-3">
			<_ImageCarousel />

			<div className="flex flex-col gap-[20px]">
				<p className="block text-Title03">오늘 하루 예약 일정을 살펴볼게요.</p>
				<_TodaysReservationSummary />
				<_ReservationDetailArr />
			</div>

			<HomeDivider />

			<CardList />
		</div>
	)
}

function _ImageCarousel() {
	return <div className="h-[380px] w-full bg-red-400" />
}
function _TodaysReservationSummary() {
	return (
		<div className="flex justify-between gap-[24px]">
			<ReservationPendingCard />
			<ReservationConfirmedCard />
		</div>
	)
}

function _ReservationDetailArr() {
	return (
		<div className="h-[646.39px] w-full rounded-[26px] bg-red-300 shadow-[#E0E0E0]" />
	)
}

function HomeDivider() {
	return (
		<div className="relative h-[12px] w-full bg-White">
			<div className="absolute left-0 h-full w-full scale-[200%] border-y-2 border-[#80D6F8]/40 bg-White" />
		</div>
	)
}

function CardList() {
	const itemArr = Array.from({ length: 16 })
	return (
		<div className="flex h-fit w-full items-center overflow-y-hidden overflow-x-scroll">
			{itemArr.map((item, idx) => {
				return (
					<NoticeCard
						key={idx}
						id={0}
						category={"NEWS"}
						srcArr={[]}
						title={""}
						content={""}
						likes={0}
						views={0}
						comments={0}
						createdAt={{
							year: 0,
							month: 0,
							day: 0,
							hour: 0,
							minute: 0,
							division: "PM",
						}}
						commentArr={[]}
					/>
				)
			})}
		</div>
	)
}
