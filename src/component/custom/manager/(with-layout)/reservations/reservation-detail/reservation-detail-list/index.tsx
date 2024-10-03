import { CONDITION_LIST, REMOVE_LIST, TREATMENT_LIST } from "@/constant/tagList"
import type { TResViewReservation } from "@/util/api-v2/get-reservation-detail"

import DeatailBox from "../detail-box"
import { formatTreatmentRequestTime } from "../reservation-detail.util"

type ReservationDetailListPT = {
	reservation: TResViewReservation
	selectedId: number
}

export default function ReservationDetailList({
	reservation,
	selectedId,
}: ReservationDetailListPT) {
	const { customerName, startTime, conditionList, extend, remove, treatment } =
		reservation

	const conditionListArr = conditionList
		.map((item) => CONDITION_LIST[item.option])
		.join(" , ")

	return (
		<>
			<div className="flex h-fit w-full items-center justify-between bg-Gray10">
				<p className="py-5 pl-4 text-Title03 font-Bold text-Gray70">
					예약 정보 확인
				</p>
				<p className="mr-4 h-fit w-fit rounded-full bg-PB50 px-3 py-1 text-Body01 font-SemiBold text-White">
					예약번호 : #{selectedId}
				</p>
			</div>
			<DeatailBox title="이름(예약자)" content={customerName} />
			<DeatailBox
				title="시술 내용"
				content={TREATMENT_LIST[treatment.option]}
			></DeatailBox>
			<DeatailBox title="제거 유무" content={REMOVE_LIST[remove]} />
			<DeatailBox
				title="연장 유무"
				content={extend ? "연장 필요" : "연장 필요 없음"}
			/>
			<DeatailBox title="컨디션" content={conditionListArr} />
			<DeatailBox
				title="시술 시간"
				content={formatTreatmentRequestTime(startTime)}
			/>
		</>
	)
}
