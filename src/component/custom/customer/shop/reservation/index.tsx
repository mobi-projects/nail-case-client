"use client"

import { useState } from "react"

import { NTButton } from "@/component/common/atom/nt-button"
import { useModal } from "@/component/common/nt-modal/nt-modal.context"
import type { TReqReservationForm } from "@/util/api/post-register-reservation"
import { getNowStamp } from "@/util/common"

import FocusingCard from "./common/focusing-card"
import SectionDivider from "./common/section-divider"
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
	const [reservationForm, setReservationForm] = useState<TReqReservationForm>(
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
			isX: false,
		})
	}
	return (
		<div className="flex h-fit w-full flex-col gap-10 py-[33px] max-md:gap-6 max-md:py-4">
			<FocusingCard title="시술 세부 내용">
				<MemorizedOptions
					shopId={shopId}
					reservationForm={reservationForm}
					setReservationForm={setReservationForm}
				/>
			</FocusingCard>
			<SectionDivider />
			<div className="flex h-fit w-full flex-col gap-[18px]">
				<p className="px-[40px] text-[22px] font-SemiBold lg:text-[18px] max-md:px-5 max-md:text-[16px]">
					날짜 선택
				</p>
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
				<p className="px-[40px] text-[22px] font-SemiBold lg:text-[18px] max-md:px-5 max-md:text-[16px]">
					시간 선택
				</p>
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
					<p className="lg:text-[18px] max-md:text-[14px]">예약하기</p>
				</NTButton>
			</div>
		</div>
	)
}
