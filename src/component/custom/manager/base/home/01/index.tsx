"use client"

import { useEffect, useState } from "react"

import { NTButton } from "@/component/common/atom/nt-button"
import NTContent from "@/component/common/nt-content"
import NTIcon from "@/component/common/nt-icon"
import NTOption from "@/component/common/nt-option"
import { useListReservationQuery } from "@/hook/use-reservation-controller"
import type { TResGetListReservation, TReservationDetailList } from "@/type"
import { getShopById } from "@/util/api/shop-controller"
import { getThisDate, getThisMonth, getThisYear } from "@/util/common"
import { tagLists } from "@/util/common/tagList"

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
		data: reservationData,
		isError,
		error,
	} = useListReservationQuery(
		1,
		timeRange.startTime.getTime() / 1000,
		timeRange.endTime.getTime() / 1000,
	)
	const reservationArr = reservationData?.dataList || []
	if (isError) {
		return <div>Error: {error.message}</div>
	}
	const confirmedReservationCount = reservationArr
		.map((reservation) =>
			reservation.reservationDetailList.filter(
				(detail) => detail.status === "CONFIRMED",
			),
		)
		.flat().length

	return (
		<div className="flex h-[240px] w-full justify-between gap-[24px]">
			<WaitingCard reservationArr={reservationArr} shopName={shopName} />
			<ConfirmedCard
				confirmedReservationCount={confirmedReservationCount}
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
	const pendingReservations = reservationArr
		.map((reservation) =>
			reservation.reservationDetailList.filter(
				(detail) => detail.status === "PENDING",
			),
		)
		.flat()

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
	const [pendingDataArr, setPendingDataArr] = useState<
		Array<TReservationDetailList>
	>([])
	useEffect(() => {
		setPendingDataArr(pendingReservations)
	}, [pendingReservations])
	if (pendingDataArr.length === 0) {
		return <div></div>
	}
	return (
		<div className="flex h-full w-[542px] flex-col px-[21px]">
			<DetailDate
				startTime={pendingDataArr[0].startTime}
				dataLength={pendingDataArr.length}
				idx={0}
			/>
			<hr className="w-full" />
			<DetailTagList pendingData={pendingDataArr[0]} />
		</div>
	)
}
type DetailDatePT = {
	startTime: number
	dataLength: number
	idx: number
}
function DetailDate({ startTime, dataLength, idx }: DetailDatePT) {
	const startDate = new Date(startTime * 1000).toLocaleString("ko-KR", {
		month: "long",
		day: "numeric",
		weekday: "short",
		hour: "numeric",
	})
	return (
		<div className="flex w-full justify-between pb-4 pl-[15px] pr-[1px]">
			<div className="text-Title03 text-Gray70">{startDate}</div>

			<NTContent mode="day">{`${idx + 1}/${dataLength}`}</NTContent>
		</div>
	)
}
type DetailTagListPT = {
	pendingData: TReservationDetailList
}
function DetailTagList({ pendingData }: DetailTagListPT) {
	const tagList = [
		pendingData.remove,
		...pendingData.conditionList.map((data) => data.option.toString()),
		pendingData.treatmentList[0].option,
	]
	const extendTag = pendingData.extend

	const translateTagList = () => {
		const extendTagTranslate = extendTag ? "연장 필요" : "연장 필요없음"
		const tagListTranslate = tagList.map((tag) => tagLists[tag])
		return [...tagListTranslate, extendTagTranslate]
	}
	const limitedTopTagList = translateTagList().slice(0, 4)
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
