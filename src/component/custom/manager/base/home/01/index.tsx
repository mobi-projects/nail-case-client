"use client"

import { useState } from "react"

import { NTButton } from "@/component/common/atom/nt-button"
import NTContent from "@/component/common/nt-content"
import NTIcon from "@/component/common/nt-icon"
import NTOption from "@/component/common/nt-option"
import { CONDITION_LIST, REMOVE_LIST, TREATMENT_LIST } from "@/constant/tagList"
import { useListReservationQuery } from "@/hook/use-reservation-controller"
import type { TResGetListReservation, TReservationDetailList } from "@/type"
import type { TNailCondition } from "@/type/union-option/nail-condition"
import { getShopById } from "@/util/api/shop-controller"
import { getThisDate, getThisMonth, getThisYear } from "@/util/common"

export default function ReservationCard() {
	const [shopName, setShopName] = useState<string | null>(null)

	const fetchShopName = async () => {
		const shop = await getShopById(1)
		setShopName(shop.data.shopName)
	}
	fetchShopName()

	const timeRange = {
		startTime: new Date(
			getThisYear(),
			getThisMonth() - 1,
			getThisDate(),
			0,
			0,
			0,
		),
		endTime: new Date(
			getThisYear(),
			getThisMonth() - 1,
			getThisDate(),
			23,
			59,
			59,
		),
	}
	const {
		data: pendingData,
		isError: pendingIsError,
		error: pendingError,
	} = useListReservationQuery(
		1,
		timeRange.startTime.getTime() / 1000,
		timeRange.endTime.getTime() / 1000,
		"PENDING",
	)

	const {
		data: confirmData,
		isError: confirmIsError,
		error: confirmError,
	} = useListReservationQuery(
		1,
		timeRange.startTime.getTime() / 1000,
		timeRange.endTime.getTime() / 1000,
		"CONFIRMED",
	)
	const pendingReservation = pendingData?.dataList || []
	if (pendingIsError) {
		return <div>Error: {pendingError.message}</div>
	}
	const confirmReservation = confirmData?.dataList || []
	if (confirmIsError) {
		return <div>Error: {confirmError.message}</div>
	}
	return (
		<div className="flex h-[240px] w-full justify-between gap-[24px]">
			<WaitingCard reservationArr={pendingReservation} shopName={shopName} />
			<ConfirmedCard
				confirmedReservationCount={confirmReservation.length}
				shopName={shopName}
			/>
		</div>
	)
}
type WaitingCardPT = {
	shopName: string | null
	reservationArr: Array<TResGetListReservation>
}
function WaitingCard({ reservationArr, shopName }: WaitingCardPT) {
	const pendingReservations = reservationArr.reduce<TReservationDetailList[]>(
		(data, reservation) => {
			data.push(...reservation.reservationDetailList)
			return data
		},
		[],
	)
	if (pendingReservations.length === 0) {
		return <div></div>
	}
	return (
		<div className="flex h-[240px] w-[792px] rounded-[26px] bg-White px-[5px] py-[19.5px] shadow-customGray60">
			<WaitingTotalCard
				pendingReservationCount={pendingReservations.length}
				shopName={shopName}
			/>
			<WaitingDetailCard pendingReservations={pendingReservations} />
		</div>
	)
}
type WaitingTotalCard = {
	shopName: string | null
	pendingReservationCount: number
}
function WaitingTotalCard({
	pendingReservationCount,
	shopName,
}: WaitingTotalCard) {
	return (
		<div className="flex w-[239px] flex-col gap-[92px] border-r-[2px] border-Gray10 px-[28px] pb-[5.5px] pt-[5px]">
			<div className="flex gap-[15px] pr-[2px]">
				<NTIcon icon="deskAltLight" className="h-[46px] w-[46px] text-PB100" />
				<div>
					<div className="text-Title02 font-Bold">예약대기</div>
					<div className="text-Body01 text-Gray40">{shopName}</div>
				</div>
			</div>
			<div className="pl-[10px] text-LargeTitle font-Bold text-PB100">
				{pendingReservationCount}건
			</div>
		</div>
	)
}

type WaitingDetailCardPT = {
	pendingReservations: Array<TReservationDetailList>
}
function WaitingDetailCard({ pendingReservations }: WaitingDetailCardPT) {
	const removeTag = pendingReservations[0].remove
	const conditionTagList = pendingReservations[0].conditionList.map(
		(data) => data.option as TNailCondition,
	)

	const treatmentTag = pendingReservations[0].treatmentList[0].option
	const extendTag = pendingReservations[0].extend

	const translateTagList = () => {
		const extendTagTranslate = extendTag ? "연장 필요" : "연장 필요없음"
		const removeTagTranslate = REMOVE_LIST[removeTag]
		const conditionTagTranslate = conditionTagList.map(
			(tag) => CONDITION_LIST[tag],
		)
		const treatmentTagTranslate = TREATMENT_LIST[treatmentTag]
		return [
			extendTagTranslate,
			removeTagTranslate,
			...conditionTagTranslate,
			treatmentTagTranslate,
		]
	}

	return (
		<div className="flex h-full w-[542px] flex-col px-[21px]">
			<DetailDate
				startTime={pendingReservations[0].startTime}
				tagLength={translateTagList().length}
			/>
			<hr className="w-full" />
			<DetailTagList tagList={translateTagList()} />
		</div>
	)
}
type DetailDatePT = {
	startTime: number
	tagLength: number
}
function DetailDate({ startTime, tagLength }: DetailDatePT) {
	const startDate = new Date(startTime * 1000).toLocaleString("ko-KR", {
		month: "long",
		day: "numeric",
		weekday: "short",
		hour: "numeric",
	})
	return (
		<div className="flex w-full justify-between pb-4 pl-[15px] pr-[1px]">
			<div className="text-Title03 text-Gray70">{startDate}</div>

			<NTContent mode="day">{`태그 ${tagLength}개`}</NTContent>
		</div>
	)
}
type DetailTagListPT = {
	tagList: Array<string>
}
function DetailTagList({ tagList }: DetailTagListPT) {
	const limitedTopTagList = tagList.slice(0, 4)
	return (
		<div className="flex h-full w-full justify-between pl-[4px] pr-[1px] pt-[13px]">
			<div className="flex h-full flex-col gap-y-4">
				<NTOption
					optionArr={limitedTopTagList}
					className="flex flex-wrap gap-x-4"
					size="large"
				/>
			</div>
			<div className="flex w-fit shrink-0 items-end">
				<NTButton icon="check" flexible="fit">
					예약 확정
				</NTButton>
			</div>
		</div>
	)
}
type ConfirmedCardPT = {
	confirmedReservationCount?: number
	shopName?: string | null
}
function ConfirmedCard({
	confirmedReservationCount,
	shopName,
}: ConfirmedCardPT) {
	return (
		<div className="relative flex h-[240px] w-[384px] flex-col justify-between rounded-[26px] bg-Gray90 px-[22.5px] py-[25px] shadow-customGray60">
			<ConfirmedCardHeader shopName={shopName} />
			<TotalConfirmed confirmedReservationCount={confirmedReservationCount} />
		</div>
	)
}
function ConfirmedCardHeader({ shopName }: ConfirmedCardPT) {
	return (
		<div className="flex justify-between gap-[96.5px] pl-[7.5px]">
			<div className="flex gap-[18px]">
				<NTIcon
					icon="deskAltLight"
					className="mt-[2px] h-[46px] w-[46px] text-White"
				/>
				<div>
					<div className="text-Title02 font-Bold text-White">예약확정</div>
					<div className="text-Body01 text-Gray50">{shopName}</div>
				</div>
			</div>
			<div className="flex h-[56px] w-[56px] items-center justify-center rounded-full bg-PB100">
				<NTIcon icon="arrowUp" className="h-[40px] w-[40px] text-White" />
			</div>
		</div>
	)
}
function TotalConfirmed({ confirmedReservationCount }: ConfirmedCardPT) {
	return (
		<div className="pl-[4px] text-LargeTitle font-Bold text-PB100">
			{confirmedReservationCount}건
		</div>
	)
}
