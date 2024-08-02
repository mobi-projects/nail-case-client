import type { TReservationStatus } from "@/type/union-option/resesrvation-status"
import type { TReservation } from "@/util/api-v2/list-reservation"

import { ButtonPair } from "./button-pair"
import Divider from "./divider"
import FilterPanel from "./filter-panel"
import { NameNTime } from "./name-n-time"
import { ReservationDetails } from "./reservation-details"

type ListBodyPT = {
	reservationList: TReservation[]
	status: TReservationStatus
}
export function ListBody({ reservationList, status }: ListBodyPT) {
	const isPendingList = status === "PENDING"
	const isConfirmedList = status === "CONFIRMED"
	return (
		<div className="relative flex h-fit w-full flex-col gap-[22px] rounded-[18px] bg-BGblue01 px-[45px] pb-[45px] pt-[90px]">
			{isConfirmedList && <FilterPanel />}
			{reservationList.map((reservation) => {
				const {
					id,
					nickname,
					startTime,
					endTime,
					treatmentDetail,
					remove,
					extend,
					conditionOptions,
				} = reservation
				return (
					<div
						key={id}
						className="grid h-fit min-h-[264px] w-full cursor-pointer grid-cols-[2fr_auto_8fr_auto_2fr] gap-[10px] rounded-[20px] bg-White px-[25px] py-[14px]"
					>
						<NameNTime {...{ nickname, startTime, endTime }} />
						<Divider />
						<ReservationDetails
							{...{ treatmentDetail, remove, extend, conditionOptions }}
						/>
						{isPendingList && (
							<>
								<Divider />
								<ButtonPair />
							</>
						)}
					</div>
				)
			})}
		</div>
	)
}
