import Image from "next/image"
import { useState } from "react"
import { toast, Toaster } from "sonner"

import {
	ImageMockList,
	ImageMockMonthList,
} from "@/app/(customer)/(home)/mockData"
import { NTButton } from "@/component/common/atom/nt-button"
import NTContent from "@/component/common/nt-content"
import { RESERVATION_STATUS } from "@/constant/reservation-status"
import { REMOVE_LIST, CONDITION_LIST, TREATMENT_LIST } from "@/constant/tagList"
import { useUpdateReservationMutation } from "@/hook/use-reservation-controller"
import type { TReqBodyUpdateReservation } from "@/type"
import type {
	TRecentReservation,
	TResCompletedReservation,
} from "@/type/main-page"
import type { TReservationStatus } from "@/type/union-option/resesrvation-status"
import {
	getDateFromStamp,
	getDayDivisionInKor,
	getDayOfWeekFromStamp,
	getHourFromStamp,
	getMinFromStamp,
	getMonthFromStamp,
} from "@/util/common"

type UsageFormPT = {
	recentReservation: TRecentReservation
	PastReservation: Array<TResCompletedReservation>
}
export default function UsageForm({
	recentReservation,
	PastReservation,
}: UsageFormPT) {
	const [currentReservation, setCurrentReservation] =
		useState<TRecentReservation | null>(recentReservation)
	return (
		<div className="flex h-fit gap-[24px] pb-[45px] pt-[30.5px]">
			<ReservationForm
				currentReservation={currentReservation}
				setCurrentReservation={setCurrentReservation}
				ImageMockList={ImageMockList}
			/>
			<PastHistoryForm
				PastReservationImage={ImageMockMonthList}
				PastReservation={PastReservation}
			/>
		</div>
	)
}
type ReservationFormPT = {
	currentReservation: TRecentReservation | null
	setCurrentReservation: React.Dispatch<
		React.SetStateAction<TRecentReservation | null>
	>
	ImageMockList: Array<string>
}
function ReservationForm({
	currentReservation,
	setCurrentReservation,
	ImageMockList,
}: ReservationFormPT) {
	const collectImages = (image: Array<string>) => {
		return image.flatMap((detail) => detail)
	}
	const imageList = collectImages(ImageMockList)

	return (
		<div className="flex h-fit w-[690px] flex-col justify-center gap-[16.5px] rounded-[26px] px-[25px] py-[22px] shadow-customGray60">
			<div className="text-Title03 font-Bold text-PB100">진행 중인 네일</div>
			{currentReservation ? (
				<div className="flex gap-[16px]">
					<ReservationImageList imageList={imageList} />
					<ReservationInfo
						currentReservation={currentReservation}
						setCurrentReservation={setCurrentReservation}
					/>
				</div>
			) : (
				<div className="h-[220px] pt-[80px] text-center text-Title03 font-SemiBold text-Gray100">
					현재 예약 정보가 없습니다
				</div>
			)}
		</div>
	)
}
type ReservationImageListPT = {
	imageList: Array<string>
}
function ReservationImageList({ imageList }: ReservationImageListPT) {
	const [firstImage, ...otherImages] = imageList
	const sliceImageList = otherImages.slice(0, 4)
	return (
		<div className="flex flex-col gap-[9px]">
			<div className="relative h-[174px] w-[173px] rounded-[7px]">
				{firstImage ? (
					<Image
						className="rounded-[7px]"
						src={firstImage}
						alt={firstImage}
						objectFit="cover"
						fill
					/>
				) : (
					<div className="h-full w-full pt-[50px] text-center text-Body02 font-SemiBold">
						예약 사진이 없습니다
					</div>
				)}
			</div>

			<div className="flex gap-[4px]">
				{sliceImageList.map((image, idx) => (
					<div className="relative h-[40px] w-[40px] rounded-[4px]" key={idx}>
						<Image
							className="rounded-[4px]"
							src={image}
							alt={image}
							objectFit="cover"
							fill
						/>
					</div>
				))}
			</div>
		</div>
	)
}
type ReservationInfoPT = {
	currentReservation: TRecentReservation
	setCurrentReservation: React.Dispatch<
		React.SetStateAction<TRecentReservation | null>
	>
}
function ReservationInfo({
	currentReservation,
	setCurrentReservation,
}: ReservationInfoPT) {
	return (
		<div className="flex h-fit w-full flex-col gap-[17px]">
			<InfoForm currentReservation={currentReservation} />
			<InfoButtonFrom
				currentReservation={currentReservation}
				setCurrentReservation={setCurrentReservation}
			/>
		</div>
	)
}
type InfoFormPT = {
	currentReservation: TRecentReservation
}
function InfoForm({ currentReservation }: InfoFormPT) {
	const dataList = currentReservation.details
	const status = RESERVATION_STATUS[dataList[0].status]
	const tagListFuntion = () => {
		const tags = []
		if (dataList[1]) {
			tags.push("동반 2인")
		}
		if (dataList[0].accompanied) {
			tags.push("연장 필요")
		} else {
			tags.push("연장 필요없음")
		}
		const removeTagTranslate = REMOVE_LIST[dataList[0].removeOption]
		if (removeTagTranslate) {
			tags.push(removeTagTranslate)
		}
		const conditionTagTranslate = dataList[0].conditionOptions
			.map((tag) => CONDITION_LIST[tag])
			.filter((tag) => tag)
		tags.push(...conditionTagTranslate)

		const treatmentTagTranslate = dataList[0].treatmentOptions
			.map((tag) => TREATMENT_LIST[tag])
			.filter((tag) => tag)
		tags.push(...treatmentTagTranslate)

		return tags.slice(0, 4).join(", ")
	}
	const timestampFuntion = (timeStamp: number) => {
		const month = getMonthFromStamp(timeStamp)
		const day = getDateFromStamp(timeStamp)
		const dayOfWeek = getDayOfWeekFromStamp(timeStamp)
		const hour = getHourFromStamp(timeStamp)
		const minute = getMinFromStamp(timeStamp)
		const dayDivision = getDayDivisionInKor(timeStamp)
		const minuteForm = minute.toString().padStart(2, "0")

		return `${month}월 ${day}일 (${dayOfWeek}) ${dayDivision} ${hour}:${minuteForm}`
	}

	const endReservation = (timeStamp: number) => {
		const hour = getHourFromStamp(timeStamp)
		const minute = getMinFromStamp(timeStamp)
		const minuteForm = minute.toString().padStart(2, "0")
		return ` ~ ${hour}:${minuteForm}`
	}

	return (
		<div className="flex flex-col gap-[12px] border-b-[1.5px] border-Gray10 pb-[25px]">
			<NTContent mode="day" className="px-[15.5px]">
				{status}
			</NTContent>
			<div className="flex flex-col gap-[6px]">
				<div className="text-Body01 font-SemiBold text-Gray100">
					{currentReservation.shop.name}
				</div>
				<div className="text-Body02 font-SemiBold text-PB100">
					{timestampFuntion(dataList[0].startTime)}
					{dataList[0].endTime ? `${endReservation(dataList[0].endTime)}` : ""}
				</div>
				<div className="text-Body02 text-Gray100">{tagListFuntion()}</div>
			</div>
		</div>
	)
}
function InfoButtonFrom({
	currentReservation,
	setCurrentReservation,
}: ReservationInfoPT) {
	return (
		<div className="flex w-full items-center justify-end pr-[2px]">
			<InfoButtonList
				currentReservation={currentReservation}
				setCurrentReservation={setCurrentReservation}
			/>
			<div className="flex h-fit items-center gap-[11px] text-Button font-Medium text-Gray60"></div>
		</div>
	)
}
function InfoButtonList({
	currentReservation,
	setCurrentReservation,
}: ReservationInfoPT) {
	const { updateReservation } = useUpdateReservationMutation(
		currentReservation.shop.id,
	)
	const handleUpdateReservation = async () => {
		const status: TReservationStatus = "CANCELED"

		const updatedData: TReqBodyUpdateReservation = {
			status,
			reservationDetailDtoList: [],
		}
		try {
			await updateReservation({
				reservationId: currentReservation.reservationId,
				updated: updatedData,
			})
			toast.success("예약 취소 되엇습니다")
			setCurrentReservation(null)
		} catch (error) {
			toast.error("예약 취소 요청이 실패하여 가게로 연락부탁드립니다")
		}
	}

	return (
		<div className="flex gap-[22px]">
			<Toaster position="top-center" />
			<NTButton
				variant="secondary"
				flexible="fit"
				onClick={() =>
					toast.warning("예약을 취소하시겠습니까?", {
						action: {
							label: "예약취소",
							onClick: handleUpdateReservation,
						},
					})
				}
			>
				예약취소
			</NTButton>
		</div>
	)
}
type PastHistoryFormPT = {
	PastReservationImage: Array<{ month: number; image: string }>
	PastReservation: Array<TResCompletedReservation>
}
function PastHistoryForm({
	PastReservationImage,
	PastReservation,
}: PastHistoryFormPT) {
	return (
		<div className="flex h-fit w-[486px] flex-col justify-center gap-[21.5px] rounded-[26px] px-[21px] pb-[20px] pt-[22px] shadow-customGray60">
			<div className="text-Title03 font-SemiBold text-Gray100">
				다시 돌아보는 지난 네일
			</div>
			{PastReservationImage ? (
				<PastHistoryImageList
					PastReservationImage={PastReservationImage}
					PastReservation={PastReservation}
				/>
			) : (
				<div className="h-[220px] pt-[80px] text-center text-Title03 font-SemiBold text-Gray100">
					지난 예약 정보가 없습니다
				</div>
			)}
		</div>
	)
}
function PastHistoryImageList({
	PastReservationImage,
	PastReservation = [],
}: PastHistoryFormPT) {
	const slicePastList = PastReservation.slice(0, 2)
	console.log("PastReservation", PastReservation)
	return (
		<div className="flex gap-[12px]">
			<div className="relative flex h-[220px] w-[326px] items-end pb-[20px] pl-[22px]">
				<div className="absolute inset-0 z-10 rounded-l-[26px] bg-gradient-to-t from-Black to-White opacity-[0.52]" />
				<Image
					src={PastReservationImage[0].image}
					alt={PastReservationImage[0].month.toString()}
					fill
					className="rounded-l-[26px]"
					priority
					sizes="326px"
				/>
				<div className="z-20 flex h-[30px] items-center gap-[3px] text-Title03 font-SemiBold text-White">
					<span>{PastReservationImage[0].month}월 카타네일</span>
				</div>
			</div>
			<div className="flex w-fit flex-col gap-[8px]">
				{slicePastList.map((_, idx) => (
					<div
						className="relative z-10 flex h-[106px] w-[106px] items-end pb-[6px] pl-[8.5px]"
						key={idx}
					>
						<div className="absolute inset-0 z-20 rounded-r-[26px] bg-gradient-to-t from-Black to-White opacity-[0.52]" />
						<Image
							src={PastReservationImage[idx + 1].image}
							alt={PastReservationImage[idx + 1].month.toString()}
							fill
							priority
							sizes="106px"
							className="rounded-r-[26px]"
						/>
						<div className="absolute z-20 text-Headline02 text-Gray10">
							{PastReservationImage[idx + 1].month}월
						</div>
					</div>
				))}
			</div>
		</div>
	)
}
