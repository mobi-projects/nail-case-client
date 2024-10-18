import type { FormEvent } from "react"
import { useEffect, useRef, useState } from "react"

import {
	useViewReservationDetail,
	useMutateConfirmReservation,
} from "@/hook/use-reservation-controller"
import { isUndefined } from "@/util/common/type-guard"

import type { TStatusExcludeCanceled } from "../reservations.type"

import HasNoReservationDetail from "./has-no-reservation-detail"
import Price from "./price"
import RejectReason from "./reject-reason"
import ReservationDetailControlBtn from "./reservation-detail-control-btn"
import ReservationDetailList from "./reservation-detail-list"
import ReservationDetailSkeleton from "./reservation-detail-skeleton"
import { validatePriceNEndTime } from "./reservation-detail.util"
import ReservationPermissionForm from "./reservation-permission-form"

type ReservationDetailPT = {
	selectedId: number
	shopId: number
	status: TStatusExcludeCanceled
}

export default function ReservationDetail({
	selectedId,
	shopId,
	status,
}: ReservationDetailPT) {
	// 상태 정의
	const [isAccepting, setIsAccepting] = useState(false)
	const [, setIsValid] = useState(false)
	const [showSkeleton, setShowSkeleton] = useState(false)

	// ref변수 정의
	const endTimeRef = useRef<number>(-1)
	const scrollRef = useRef<HTMLDivElement>(null)

	// query 관련
	const { data, isLoading, isError } = useViewReservationDetail(
		shopId,
		selectedId,
	)
	const { mutate } = useMutateConfirmReservation(shopId, selectedId)

	// submit event handler
	const onSubmitPermission = (e: FormEvent<HTMLFormElement>) => {
		const priceValue = e.currentTarget.price.value.replace(/,/g, "")
		const endTime = endTimeRef.current

		const validate = validatePriceNEndTime(priceValue, endTime)
		if (!validate) return

		setIsValid(true)
		mutate({ endTime: endTime, price: priceValue })
	}

	// useEffect
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

	useEffect(() => {
		if (scrollRef.current && isAccepting) {
			scrollRef.current.scrollIntoView({ behavior: "smooth", block: "end" })
		}
	}, [isAccepting, scrollRef])

	// early return
	if (isLoading && !showSkeleton) return <DefaultSkeleton />
	if (showSkeleton && isLoading)
		return <ReservationDetailSkeleton status={status} />

	if (isUndefined(data)) return <HasNoReservationDetail status={status} />
	if (isError) return <Error />
	return (
		<form
			onSubmit={(e: FormEvent<HTMLFormElement>) => {
				e.preventDefault()
				if (!isAccepting) {
					onSubmitPermission(e)
				}
			}}
			className="scrollbar-none flex h-[610px] max-h-[610px] min-h-[610px] w-full flex-col overflow-y-scroll rounded-md border border-Gray20 bg-White shadow-customGray80 transition-opacity"
		>
			<ReservationDetailList
				reservation={data}
				selectedId={selectedId}
				status={status}
				shopId={shopId}
			/>
			<ReservationPermissionForm
				reservation={data}
				isAccepting={isAccepting}
				selectedId={selectedId}
				setIsAccepting={setIsAccepting}
				endTime={endTimeRef}
			/>
			{status === "PENDING" && (
				<ReservationDetailControlBtn
					isAccepting={isAccepting}
					setIsAccepting={setIsAccepting}
					shopId={shopId}
					reservationId={selectedId}
				/>
			)}
			{status === "REJECTED" && <RejectReason reservation={data} />}
			{status === "CONFIRMED" && <Price reservation={data} />}
			<div ref={scrollRef} />
		</form>
	)
}

function Error() {
	return (
		<div className="grid h-[610px] max-h-[610px] w-full grid-rows-[auto_1fr_auto] rounded-md border border-Gray20 bg-White shadow-customGray80" />
	)
}

function DefaultSkeleton() {
	return (
		<div className="grid h-[610px] max-h-[610px] min-h-[610px] w-full grid-rows-[1fr_6fr_1fr_1fr] rounded-md border border-Gray20 bg-White p-6 shadow-customGray80" />
	)
}
