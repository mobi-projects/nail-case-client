import { useRouter } from "next/navigation"
import { useCallback, useEffect, useState } from "react"

import { NTButton } from "@/component/common/atom/nt-button"
import type { ICON_DATA } from "@/component/common/nt-icon"
import NTIcon from "@/component/common/nt-icon"
import NTLoadingSpinner from "@/component/common/nt-loading-spinner"
import Pagination from "@/component/common/nt-pagination"
import { useSheet } from "@/component/common/nt-sheet/nt-sheet.context"
import { cn } from "@/config/tailwind"
import { REMOVE_LIST, TREATMENT_LIST } from "@/constant/tagList"
import { useRegisterReservationMutation } from "@/hook/use-reservation-controller"
import type {
	TReqBodyRegisterReservation,
	TResPostRegisterReservation,
} from "@/type"
import {
	get12HourFromStamp,
	getDateFromStamp,
	getDayDivisionInKor,
	getDayOfWeekFromStamp,
	getMinFromStamp,
	getMonthFromStamp,
	padStartToPrinting,
} from "@/util/common"
import { isUndefined } from "@/util/common/type-guard"

type ReservationResponseSheetPT = {
	shopId: number
	newReservation: TReqBodyRegisterReservation
}

export default function ReservationResponseSheet({
	shopId,
	newReservation,
}: ReservationResponseSheetPT) {
	const [reservationContents, setReservationContents] = useState<
		TResPostRegisterReservation | undefined
	>(undefined)

	const { mutateAsync, status } = useRegisterReservationMutation(shopId)
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

	const companion = reservationContents?.reservationDetailList.length
	const reservationStamp =
		reservationContents?.reservationDetailList[0].startTime
	return (
		<div className="flex h-full w-full flex-col items-center justify-center gap-4">
			<SheetIcon {...{ isError }} />
			<ResponseMessage {...{ isError }} />

			{!isError && (
				<ReservationContent
					shopId={shopId}
					reservationStamp={reservationStamp!}
					companion={companion!}
					reservationContents={reservationContents!}
				/>
			)}

			<div className="flex h-fit w-3/5 items-center justify-center gap-2">
				<BackToButton
					buttonType={isError ? "reservation" : "shop"}
					shopId={shopId}
				/>
				<BackToButton buttonType="home" shopId={shopId} />
			</div>
		</div>
	)
}

function SheetIcon({ isError = false }: { isError?: boolean }) {
	return (
		<div
			className={cn(
				"flex h-[56px] w-[56px] items-center justify-center overflow-hidden rounded-full",
				isError ? "bg-PB90" : "bg-gradient-to-t from-PB100 to-PY100 p-0",
			)}
		>
			{isError ? (
				<p className="text-center text-Headline01 text-White">!</p>
			) : (
				<NTIcon
					icon="circleUpRight"
					className="h-[100px] w-[100px] bg-transparent text-Gray90"
				/>
			)}
		</div>
	)
}
function ResponseMessage({ isError = false }: { isError?: boolean }) {
	return (
		<div className="flex h-fit w-full flex-col items-center gap-[1px]">
			{isError ? (
				<>
					<p className="text-center text-Title01 font-Bold">
						예약 요청 중, 오류가 발생했습니다.
					</p>
					<p className="text-center text-Callout font-Light">
						예약 내용을 다시 확인해주세요.
					</p>
				</>
			) : (
				<>
					<p className="text-center text-Title01 font-Bold">
						예약이 요청되었습니다.
					</p>
					<p className="text-center text-Callout font-Light">
						예약확정에 시간이 소요될 수 있습니다.
					</p>
				</>
			)}
		</div>
	)
}

type TReservationContent = {
	shopId: number
	companion: number
	reservationStamp: number
	reservationContents: TResPostRegisterReservation
}

function ReservationContent({
	shopId,
	companion,
	reservationStamp,
	reservationContents,
}: TReservationContent) {
	return (
		<div className="grid h-3/5 w-3/5 grid-rows-[1fr_1.5px_2fr] items-center rounded-[26px] bg-Gray90 p-[19px]">
			<ContentHeader
				{...{ shopId, reservationStamp, companion, reservationContents }}
			/>
			<hr className="h-[1.5px] w-full border-Gray70" />
			<ContentBody
				{...{ shopId, reservationStamp, companion, reservationContents }}
			/>
		</div>
	)
}
function ContentHeader({ companion, reservationStamp }: TReservationContent) {
	const startTime = reservationStamp
	const printedCompanion =
		companion === 1 ? "1인 시술" : `${companion}인 동반 시술`
	const printedReservationTime = [
		`${getMonthFromStamp(startTime)}월`,
		`${getDateFromStamp(startTime)}일`,
		`(${getDayOfWeekFromStamp(startTime)}요일)`,
		`${getDayDivisionInKor(startTime)}`,
		`${get12HourFromStamp(startTime)}:${padStartToPrinting("time", getMinFromStamp(startTime))}`,
	].join(" ")

	return (
		<div className="flex h-[85px] flex-col justify-between">
			<p className="text-center text-Body01 font-SemiBold text-White">
				{/** [TODO] : shopId 로 매장정보 조회 후, 매장이름 가져오기 */}
				모네네일 한남점
			</p>
			<p className="text-center text-Body02 font-Regular text-PB100">
				{printedReservationTime}
			</p>
			<p className="text-center text-Body02 font-Regular text-White">
				{printedCompanion}
			</p>
		</div>
	)
}

function ContentBody({ companion, reservationContents }: TReservationContent) {
	const [curContentIdx, setCurContentIdx] = useState(0)

	const onClickPagination = (page: number) => {
		setCurContentIdx(page - 1)
	}
	const detailList = reservationContents.reservationDetailList
	const curContent = detailList[curContentIdx]

	const treatmentArr = curContent.treatmentList.map(
		({ option }) => TREATMENT_LIST[option],
	)
	const remove = curContent.remove
	const extend = curContent.extend

	const printedTreatmentArr = treatmentArr.join(" / ")
	const printedRemove = REMOVE_LIST[remove]
	const printedExtend = extend ? "연장 필요" : "연장 필요없음"

	return (
		<div className="flex h-full w-full flex-col justify-center gap-[15px]">
			<DetailInfo title="시술 내용" info={printedTreatmentArr} />
			<hr className="h-[2px] w-full border-Gray80" />
			<DetailInfo title="네일 제거 유무" info={printedRemove} />
			<hr className="h-[2px] w-full border-Gray80" />
			<DetailInfo title="연장 유무" info={printedExtend} />
			<hr className="h-[2px] w-full border-Gray80" />
			<Pagination
				totPage={companion}
				curPage={curContentIdx + 1}
				perPage={5}
				onChangePage={onClickPagination}
			/>
		</div>
	)
}
type DetailInfoPT = {
	title: string
	info: string
}
function DetailInfo({ title, info }: DetailInfoPT) {
	return (
		<div className="grid h-fit w-full grid-cols-[auto_2px_1fr] items-center justify-start">
			<div className="h-[22px] w-full px-[27px] text-Body02 font-SemiBold text-White">
				{title}
			</div>
			<div className="h-[13px] w-full bg-Gray70" />
			<div className="h-[22px] w-full px-[27px] text-Body02 font-SemiBold text-PB100">
				{info}
			</div>
		</div>
	)
}

type BackToButtonPT = {
	shopId: number
	buttonType: "home" | "shop" | "reservation"
}

function BackToButton({ buttonType, shopId }: BackToButtonPT) {
	const router = useRouter()
	const { onCloseSheet } = useSheet()

	const destinations: { [key in typeof buttonType]: string } = {
		home: "/",
		shop: `/shop/${shopId}`,
		reservation: `/shop/${shopId}/reservation`,
	}
	const icons: { [key in typeof buttonType]: keyof typeof ICON_DATA } = {
		home: "homeLight",
		shop: "shopLight",
		reservation: "back",
	}
	const labels: { [key in typeof buttonType]: string } = {
		home: "홈으로 돌아가기",
		shop: "매장으로 돌아가기",
		reservation: "다시 예약하기",
	}

	const onClickButton = () => {
		router.replace(destinations[buttonType])
		onCloseSheet()
	}

	return (
		<NTButton
			variant={buttonType == "home" ? "primary" : "secondary"}
			size="small"
			flexible="full"
			icon={icons[buttonType]}
			onClick={onClickButton}
		>
			{labels[buttonType]}
		</NTButton>
	)
}
