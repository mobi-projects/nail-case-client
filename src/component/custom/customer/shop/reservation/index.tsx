"use client"

import { useState } from "react"

import { NTButton } from "@/component/common/atom/nt-button"
import { useModal } from "@/component/common/nt-modal/nt-modal.context"
import {
	convertStringToInteger,
	getNowStamp,
	invalidateTime,
} from "@/util/common"

import FocusingCard from "./common/focusing-card"
import SectionDivider from "./common/section-divider"
import type { TReservationForm } from "./memorized-options"
import MemorizedOptions from "./memorized-options"
import MemoizedSchedule from "./memorized-schedule"
import ReservationCheckModal from "./modal/reservation-check-modal"
import { getIntialReservationForm } from "./reservation.uitl"

type ReservationNewPT = { shopId: number }

export default function Reservation({ shopId }: ReservationNewPT) {
	const [reservationForm, setReservationForm] = useState<TReservationForm>(
		getIntialReservationForm(shopId),
	)
	const [selectedStamp, setSelectedStamp] = useState(
		invalidateTime(getNowStamp()),
	)

	const { onOpenModal } = useModal()
	const onOpenReservationCheckModal = () => {
		onOpenModal({
			children: (
				<ReservationCheckModal
					shopId={convertStringToInteger(shopId)}
					reservationForm={reservationForm}
					reservationTimestamp={selectedStamp}
				/>
			),
		})
	}
	return (
		<div className="flex h-fit w-full flex-col gap-[50px] py-[33px]">
			<FocusingCard title="시술 세부 내용">
				<MemorizedOptions
					shopId={shopId}
					reservationForm={reservationForm}
					setReservationForm={setReservationForm}
				/>
			</FocusingCard>
			<SectionDivider />
			<div className="flex h-fit w-full flex-col gap-[18px]">
				<p className="px-[40px] text-[22px] font-SemiBold">시술 일시</p>
				<FocusingCard>
					<MemoizedSchedule
						selectedStamp={selectedStamp}
						setSelectedStamp={setSelectedStamp}
					/>
				</FocusingCard>
			</div>
			<SectionDivider />

			<div className="flex h-fit w-full items-center justify-center">
				<NTButton
					onClick={onOpenReservationCheckModal}
					// disabled={isButtonDisabled}
				>
					예약하기
				</NTButton>
			</div>
		</div>
	)
}
