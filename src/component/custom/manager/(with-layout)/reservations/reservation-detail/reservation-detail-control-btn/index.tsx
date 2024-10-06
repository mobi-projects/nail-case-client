import type { Dispatch, SetStateAction } from "react"

import { NTButton } from "@/component/common/atom/nt-button"
import { useModal } from "@/component/common/nt-modal/nt-modal.context"
import { cn } from "@/config/tailwind"

import ReservationRefuseModal from "../reservation-refuse-modal"

type ReservationDetailControlBtnPT = {
	isAccepting: boolean
	setIsAccepting: Dispatch<SetStateAction<boolean>>
	reservationId: number
	shopId: number
}

export default function ReservationDetailControlBtn({
	isAccepting,
	setIsAccepting,
	reservationId,
	shopId,
}: ReservationDetailControlBtnPT) {
	const { onOpenModal } = useModal()
	const onClickRefuseBtn = () => {
		onOpenModal({
			size: "small",
			isX: false,
			children: (
				<ReservationRefuseModal reservationId={reservationId} shopId={shopId} />
			),
		})
	}
	const onClickPermissionBtn = () => {
		setIsAccepting((prev) => !prev)
	}
	const onClickCancelPermissionBtn = () => {
		setIsAccepting(false)
	}
	return (
		<div className="flex h-full scale-90 items-end justify-end gap-[20px] py-5">
			<NTButton
				type="submit"
				variant="secondary"
				size="small"
				onClick={onClickPermissionBtn}
				className={cn(
					`flex h-[50px] w-[110px] items-center justify-center rounded-[11px] border bg-BGblue01 px-[14px] py-[12px] text-Body01 text-PB100 drop-shadow hover:bg-BGblue02 focus-visible:outline-none active:border-[1.6px] active:border-PB100 active:bg-BGblue01 disabled:bg-BGblue01 disabled:text-PB50`,
					isAccepting &&
						"animate-pulse bg-PB50/20 transition-all duration-1000 hover:animate-none",
				)}
			>
				{isAccepting ? "확정" : "수락"}
			</NTButton>
			<NTButton
				type="button"
				variant="alert"
				size="small"
				onClick={() => {
					if (isAccepting) {
						onClickCancelPermissionBtn()
					} else {
						onClickRefuseBtn()
					}
				}}
			>
				{isAccepting ? "취소" : "거절"}
			</NTButton>
		</div>
	)
}
