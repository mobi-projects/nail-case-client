import { NTButton } from "@/component/common/atom/nt-button"
import NTIcon from "@/component/common/nt-icon"
import { useModal } from "@/component/common/nt-modal/nt-modal.context"
import { useMutateCancelReservation } from "@/hook/use-reservation-controller"
import type { TReservationInfo } from "@/util/api/get-main-page-data"

import {
	createReservationOptionArr,
	transformEndTimeToString,
	transfromStartTimeToString,
} from "../reservation-summary.util"

import Tag from "./tag"

type ReservationInfoPT = {
	reservation: TReservationInfo
}

export default function ReservationInfo({ reservation }: ReservationInfoPT) {
	const { shop, details } = reservation
	const { onOpenModal } = useModal()
	const reservationOptionArr = createReservationOptionArr(details)
	const startTimeText = transfromStartTimeToString(details[0].startTime)
	const endTImeText = transformEndTimeToString(details[0].endTime)

	const onClickCancelBtn = () => {
		onOpenModal({
			children: <CancelReservationModal reservation={reservation} />,
			size: "exSmall",
			isX: false,
		})
	}
	return (
		<div className="grid grid-rows-4 max-md:flex max-md:flex-col max-md:gap-y-2">
			<div className="text-Title01 font-Bold max-md:text-[16px]">
				{shop.name}
			</div>
			<div className="flex items-center gap-x-2">
				<NTIcon
					icon="clock"
					className="text-Gray50 md:h-5 md:w-5 max-sm:hidden"
				/>
				<div className="text-xl font-SemiBold text-Gray60 md:text-[16px] max-sm:text-[12px]">
					{startTimeText} ~ {endTImeText && endTImeText}
				</div>
			</div>
			<div className="flex items-center gap-2 max-md:flex-wrap">
				{reservationOptionArr.map((option, idx) => (
					<Tag option={option} key={idx} />
				))}
			</div>
			<div className="flex w-full items-center justify-end">
				<NTButton size={"small"} variant={"alert"} onClick={onClickCancelBtn}>
					예약취소
				</NTButton>
			</div>
		</div>
	)
}

type CancelReservationModalPT = {
	reservation: TReservationInfo
}

function CancelReservationModal({ reservation }: CancelReservationModalPT) {
	const { reservationId, shop } = reservation
	const { mutate } = useMutateCancelReservation(shop.id, reservationId)
	const { onCloseModal } = useModal()

	return (
		<div className="grid h-full grid-rows-4 pt-10">
			<p className="text-center text-Title01 font-Bold">예약 취소</p>
			<p className="text-center text-Headline01 text-Gray40">
				정말 예약 취소하시겠습니까?
			</p>
			<p className="text-center text-Body01 text-Gray40">
				취소가 완료되면 모든 예약 정보가 삭제되며, 복구가 불가능하니 신중히
				결정해주세요.
			</p>
			<div className="flex w-full items-center justify-center">
				<NTButton
					variant={"alert"}
					onClick={() => {
						mutate()
						onCloseModal()
					}}
				>
					확인
				</NTButton>
			</div>
		</div>
	)
}
