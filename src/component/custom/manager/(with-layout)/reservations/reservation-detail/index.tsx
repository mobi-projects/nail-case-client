import { useEffect, useState } from "react"

import { NTButton } from "@/component/common/atom/nt-button"
import { useModal } from "@/component/common/nt-modal/nt-modal.context"
import { CONDITION_LIST, REMOVE_LIST, TREATMENT_LIST } from "@/constant/tagList"
import { useViewReservationDetail } from "@/util/api-v2/get-reservation-detail"
import { isUndefined } from "@/util/common/type-guard"

import DeatailBox from "./detail-box"
import ReservationDetailSkeleton from "./reservation-detail-skeleton"
import { formatTreatmentRequestTime } from "./reservation-detail.util"
import ReservationRefuseModal from "./reservation-refuse-modal"

type ReservationDetailPT = {
	selectedId: number
	shopId: number
}

export default function ReservationDetail({
	selectedId,
	shopId,
}: ReservationDetailPT) {
	const { onOpenModal } = useModal()

	const onClickRefuseBtn = () => {
		onOpenModal({
			size: "small",
			isX: false,
			children: <ReservationRefuseModal />,
		})
	}
	const { data, isLoading } = useViewReservationDetail(shopId, selectedId)
	const [showSkeleton, setShowSkeleton] = useState(false)

	useEffect(() => {
		const timeoutId = setTimeout(() => {
			if (isLoading) {
				setShowSkeleton(true)
			}
		}, 500) // 0.5초 딜레이 후에 Skeleton 표시

		// 로딩이 끝나면 Skeleton을 숨김
		return () => {
			clearTimeout(timeoutId)
			setShowSkeleton(false)
		}
	}, [isLoading])
	if (isLoading && !showSkeleton)
		return (
			<div className="grid h-[610px] max-h-[610px] min-h-[610px] w-full grid-rows-[1fr_6fr_1fr_1fr] rounded-md border border-Gray20 bg-White p-6 shadow-customGray80" />
		)
	if (showSkeleton && isLoading) return <ReservationDetailSkeleton />

	if (isUndefined(data)) return null // 데이터가 없는 경우 처리

	const { customerName, startTime, conditionList, extend, remove, treatment } =
		data
	const conditionListArr = conditionList
		.map((item) => CONDITION_LIST[item.option])
		.join(" , ")

	return (
		<div className="relative grid h-[610px] max-h-[610px] min-h-[610px] w-full grid-rows-6 items-center rounded-md border border-Gray20 bg-White p-6 shadow-customGray80 transition-opacity">
			<p className="absolute right-12 top-6 h-fit w-fit rounded-full bg-PB50 px-2 py-1 text-3xl font-Bold text-White">
				예약번호 : #{selectedId}
			</p>
			<DeatailBox title="이름(예약자)" content={customerName} />
			<DeatailBox
				title="시술 내용"
				content={TREATMENT_LIST[treatment.option]}
			/>
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
			<div className="flex scale-90 items-center justify-end gap-[20px]">
				<NTButton variant="secondary" size="small">
					수락
				</NTButton>
				<NTButton variant="alert" size="small" onClick={onClickRefuseBtn}>
					거절
				</NTButton>
			</div>
		</div>
	)
}
