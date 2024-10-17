import { useCallback, useEffect, useState } from "react"

import NTLoadingSpinner from "@/component/common/nt-loading-spinner"
import { useRegisterReservationMutation } from "@/hook/use-reservation-controller"
import type {
	TReqReservationForm,
	TResReservation,
} from "@/util/api/post-register-reservation"
import { isUndefined } from "@/util/common/type-guard"

import BackToButton from "./back-to-button"
import ReservationContent from "./reservation-content"
import ResponseMessage from "./response-message"
import SheetIcon from "./sheet-icon"

type ReservationResponseSheetPT = {
	newReservation: TReqReservationForm
}

export default function ReservationResponseSheet({
	newReservation,
}: ReservationResponseSheetPT) {
	const [reservationContents, setReservationContents] = useState<
		TResReservation | undefined
	>(undefined)
	const { mutateAsync, status } = useRegisterReservationMutation()
	const fetchMutateResponse = useCallback(async () => {
		try {
			const response = await mutateAsync({ newReservation })
			setReservationContents(response.data)
		} catch {
			setReservationContents(undefined)
		}
	}, [mutateAsync, newReservation])

	useEffect(() => {
		if (status === "idle") fetchMutateResponse()
	}, [status, fetchMutateResponse])

	if (status === "pending")
		return (
			<div className="flex h-full w-full flex-col items-center justify-center gap-10">
				<NTLoadingSpinner size="medium" />
				<p className="text-Body01">잠시만 기다려주세요.</p>
			</div>
		)
	const isError = status === "error" || isUndefined(reservationContents)

	const shopId = newReservation.shopId
	return (
		<div className="flex h-full w-full flex-col items-center justify-center gap-4">
			<SheetIcon isError={isError} />
			<ResponseMessage isError={isError} />
			{!isError && <ReservationContent newReservation={newReservation} />}

			<div className="flex h-fit w-3/5 items-center justify-center gap-2">
				<BackToButton
					buttonType={true ? "reservation" : "shop"}
					shopId={shopId}
				/>
				<BackToButton buttonType="home" shopId={shopId} />
			</div>
		</div>
	)
}
