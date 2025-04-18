"use client"

import { toast } from "sonner"

import { NTButton } from "@/component/common/atom/nt-button"
import { useUpdateReservationMutation } from "@/hook/use-reservation-controller"
import type { TReqBodyUpdateReservation } from "@/type"
import type { TReservationInfo, Tstatus } from "@/util/api/get-main-page-data"

type InfoButtonsPT = { recentReservation: TReservationInfo }

export default function InfoButtons({ recentReservation }: InfoButtonsPT) {
	const { shop, reservationId } = recentReservation
	const { updateReservation } = useUpdateReservationMutation(shop.id)
	const handleUpdateReservation = async () => {
		const status: Tstatus = "CANCELED"

		const updatedData: TReqBodyUpdateReservation = {
			status,
			reservationDetailDtoList: [],
		}
		try {
			await updateReservation({
				reservationId: reservationId,
				updated: updatedData,
			})
			toast.success("예약 취소 되었습니다")
			setTimeout(() => {
				window.location.href = "./"
			}, 2000)
		} catch (error) {
			toast.error("예약 취소 요청이 실패하여 가게로 연락부탁드립니다")
		}
	}
	const onClickCloseToast = () => {
		if (toast) {
			toast.dismiss(0)
		}
		toast.warning("예약을 취소하시겠습니까?", {
			action: {
				label: "예약취소",
				onClick: handleUpdateReservation,
			},
		})
	}
	return (
		<div className="flex w-full items-center pr-[2px]">
			<NTButton variant="secondary" flexible="fit" onClick={onClickCloseToast}>
				예약취소
			</NTButton>
		</div>
	)
}
