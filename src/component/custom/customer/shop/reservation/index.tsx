"use client"

import { useState } from "react"

import { NTButton } from "@/component/common/atom/nt-button"
import { useModal } from "@/component/common/nt-modal/nt-modal.context"
import { getNowStamp } from "@/util/common"

import FocusingCard from "./common/focusing-card"
import SectionDivider from "./common/section-divider"
import type { TReservationForm } from "./memorized-options"
import MemorizedOptions from "./memorized-options"
import MemoizedSchedule from "./memorized-schedule"
import MemorizedTimeSelection from "./memorized-time-selection"
import ReservationCheckModal from "./modal/reservation-check-modal"
import {
	createReservationForm,
	getIntialReservationForm,
	isValidReservationForm,
} from "./reservation.uitl"

type ReservationNewPT = { shopId: number }

export default function Reservation({ shopId }: ReservationNewPT) {
	const [reservationForm, setReservationForm] = useState<TReservationForm>(
		getIntialReservationForm(shopId),
	)
	const [selectedStamp, setSelectedStamp] = useState(getNowStamp())
	const [selectedTime, setSelectedTime] = useState(-1)

	const isButtonDisabled = isValidReservationForm(selectedTime, reservationForm)

	const { onOpenModal } = useModal()
	const reqReservationForm = createReservationForm(
		selectedStamp,
		selectedTime,
		reservationForm,
		shopId,
	)

	const onOpenReservationCheckModal = () => {
		onOpenModal({
			children: <ReservationCheckModal reservationForm={reqReservationForm} />,
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
				<p className="px-[40px] text-[22px] font-SemiBold">날짜 선택</p>
				<FocusingCard>
					<MemoizedSchedule
						selectedStamp={selectedStamp}
						setSelectedStamp={setSelectedStamp}
						shopId={shopId}
					/>
				</FocusingCard>
			</div>
			<SectionDivider />
			<div className="flex h-fit w-full flex-col gap-[18px]">
				<p className="px-[40px] text-[22px] font-SemiBold">시간 선택</p>
				<FocusingCard>
					<MemorizedTimeSelection
						shopId={shopId}
						selectedStamp={selectedStamp}
						selectedTime={selectedTime}
						setSelectedTime={setSelectedTime}
					/>
				</FocusingCard>
			</div>
			<SectionDivider />
			<div className="flex h-fit w-full items-center justify-center">
				<NTButton
					onClick={onOpenReservationCheckModal}
					disabled={isButtonDisabled}
				>
					예약하기
				</NTButton>
			</div>
		</div>
	)
}
