import { cva } from "class-variance-authority"

import { cn } from "@/config/tailwind"
import { CONDITION_LIST, REMOVE_LIST, TREATMENT_LIST } from "@/constant/tagList"
import type { TResViewReservation } from "@/util/api/get-reservation-detail"

import type { TStatusExcludeCanceled } from "../../reservations.type"
import DeatailBox from "../detail-box"
import { formatTreatmentRequestTime } from "../reservation-detail.util"

import SelectedAOMImage from "./selected-aom-image"

type ReservationDetailListPT = {
	reservation: TResViewReservation
	selectedId: number
	status: TStatusExcludeCanceled
	shopId: number
}

export default function ReservationDetailList({
	reservation,
	selectedId,
	status,
	shopId,
}: ReservationDetailListPT) {
	const {
		customerName,
		startTime,
		conditionList,
		extend,
		remove,
		treatment,
		endTime,
	} = reservation

	const conditionListArr = conditionList
		.map((item) => CONDITION_LIST[item.option])
		.join(" , ")

	const titleVarinats = cva("py-5 pl-4 text-Title03 font-Bold", {
		variants: {
			status: {
				PENDING: "text-PB70",
				REJECTED: "text-red-300",
				CONFIRMED: "text-PURPLE50",
				COMPLETED: "text-GREEN50",
			},
		},
	})
	const isAOM = treatment.option === "AOM"
	const reservationIdVarinats = cva(
		"mr-4 h-fit w-fit rounded-full px-3 py-1 text-Body01 font-SemiBold text-White",
		{
			variants: {
				status: {
					PENDING: "bg-PB70",
					REJECTED: "bg-red-300",
					CONFIRMED: "bg-PURPLE50",
					COMPLETED: "bg-GREEN",
				},
			},
		},
	)

	return (
		<>
			<div className="flex h-fit w-full items-center justify-between bg-Gray10">
				<p className={cn(titleVarinats({ status }))}>예약 정보 확인</p>
				<p className={cn(reservationIdVarinats({ status }))}>
					예약번호 : #{selectedId}
				</p>
			</div>
			<DeatailBox title="이름(예약자)" content={customerName} status={status} />
			<DeatailBox title="시술 내용" status={status}>
				<div className="flex items-center gap-x-10">
					<p>{TREATMENT_LIST[treatment.option]}</p>
					{isAOM && (
						<SelectedAOMImage
							isAOM={isAOM}
							shopId={shopId}
							treatment={treatment}
						/>
					)}
				</div>
			</DeatailBox>
			<DeatailBox
				title="제거 유무"
				content={REMOVE_LIST[remove]}
				status={status}
			/>
			<DeatailBox
				title="연장 유무"
				content={extend ? "연장 필요" : "연장 필요 없음"}
				status={status}
			/>
			<DeatailBox title="컨디션" content={conditionListArr} status={status} />
			<DeatailBox
				title="시술 시간"
				content={formatTreatmentRequestTime(startTime, endTime)}
				status={status}
			/>
		</>
	)
}
