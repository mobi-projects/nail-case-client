"use client"
import { useEffect, useState } from "react"

import { NTButton } from "@/component/common/atom/nt-button"
import { useModal } from "@/component/common/nt-modal/nt-modal.context"
import type { TReservationForm } from "@/type"
import {
	convertStringToInteger,
	getNowStamp,
	invalidateTime,
} from "@/util/common"

import FocusingCard from "../common/focusing-card"
import SectionDivider from "../common/section-divider"
import ReservationCheckModal from "../modal/01"

import Artist from "./artist"
import Companion from "./companion"
import TreatmentNCondition from "./reservation-detail"
import Schedule from "./schedule"

type ReservationFormPT = {
	shopId: number
}

const initialReservationForm: TReservationForm = {
	shopId: -1,
	nailArtistId: null,
	startTime: -1,
	remove: "NO_NEED",
	extend: false,
	conditionList: [],
	treatmentList: [],
}

export default function ReservationForm({ shopId }: ReservationFormPT) {
	const [companion, setCompanion] = useState(1)
	const [artistIdArr, setArtistIdArr] = useState<number[]>([])
	const [reservationFormArr, setReservationFormArr] = useState<
		TReservationForm[]
	>([initialReservationForm])
	const [selectedStamp, setSelectedStamp] = useState(
		invalidateTime(getNowStamp()),
	)
	/** 날짜만 선택했을 경우 false, 예약 시간대도 선택했을 경우 true */
	const [isTimeSelected, setIsTimeSelected] = useState(false)

	const { onOpenModal } = useModal()

	useEffect(() => {
		setArtistIdArr((prev) => {
			const _prev = [...prev]
			while (_prev.length > companion) _prev.pop()
			return _prev
		})
		setReservationFormArr((prev) => {
			const _prev = [...prev]
			while (_prev.length < companion) _prev.push(initialReservationForm)
			while (_prev.length > companion) _prev.pop()
			return _prev
		})
	}, [companion])

	/** 동반인원만큼 "시술내용" 이 선택 되었는지 */
	const isTreatmentListForm = reservationFormArr.every(
		(reservationForm) => !!reservationForm.treatmentList.length,
	)
	const isButtonDisabled = !(isTimeSelected && isTreatmentListForm)

	const onOpenReservationCheckModal = () => {
		onOpenModal({
			children: (
				<ReservationCheckModal
					shopId={convertStringToInteger(shopId)}
					companion={companion}
					reservationFormArr={reservationFormArr}
					reservationTimestamp={selectedStamp}
				/>
			),
		})
	}

	return (
		<div className="flex h-fit w-full flex-col gap-[50px] py-[33px]">
			<div className="flex h-fit w-full flex-col gap-[25px]">
				<FocusingCard title="예약인원">
					<Companion {...{ companion, setCompanion }} />
				</FocusingCard>
				<FocusingCard title="아티스트">
					<Artist {...{ shopId, artistIdArr, setArtistIdArr, companion }} />
				</FocusingCard>
			</div>
			<SectionDivider />
			<FocusingCard title="시술 세부 내용">
				<TreatmentNCondition
					{...{
						companion,
						artistIdArr,
						reservationFormArr,
						setReservationFormArr,
					}}
				/>
			</FocusingCard>
			<SectionDivider />
			<div className="flex h-fit w-full flex-col gap-[18px]">
				<p className="px-[40px] text-[22px] font-SemiBold">시술 일시</p>
				<FocusingCard>
					<Schedule
						{...{
							artistIdArr,
							shopId,
							selectedStamp,
							setSelectedStamp,
							setIsTimeSelected,
						}}
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
