"use client"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { toast, Toaster } from "sonner"

import {
	ImageMockList,
	ImageMockMonthList,
} from "@/app/(customer)/(home)/mockData"
import { NTButton } from "@/component/common/atom/nt-button"
import NTContent from "@/component/common/nt-content"
import NTIcon from "@/component/common/nt-icon"
import { RESERVATION_STATUS } from "@/constant/reservation-status"
import { REMOVE_LIST, CONDITION_LIST, TREATMENT_LIST } from "@/constant/tagList"
import { useUpdateReservationMutation } from "@/hook/use-reservation-controller"
import type { TReqBodyUpdateReservation } from "@/type"
import type {
	TRecentReservation,
	TResCompletedReservation,
	TResShop,
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

import type { TShop } from "../03/type"

type UsageFormPT = {
	recentReservation: TRecentReservation
	pastReservation: Array<TResCompletedReservation>
	topListData: Array<TResShop>
	topMockData: Array<TShop>
}
export default function UsageForm({
	recentReservation,
	pastReservation,
	topListData,
	topMockData,
}: UsageFormPT) {
	return (
		<div className="flex h-fit gap-[24px] pb-[45px]">
			<ReservationForm
				recentReservation={recentReservation}
				imageMockList={ImageMockList}
				pastReservation={pastReservation}
				topListData={topListData}
				topMockData={topMockData}
			/>
			{pastReservation && pastReservation.length > 0 && (
				<PastHistoryForm
					pastReservationImage={ImageMockMonthList}
					pastReservation={pastReservation}
				/>
			)}
		</div>
	)
}
type ReservationFormPT = {
	recentReservation: TRecentReservation | null
	imageMockList: Array<string>
	pastReservation: Array<TResCompletedReservation>
	topListData: Array<TResShop>
	topMockData: Array<TShop>
}
function ReservationForm({
	recentReservation,
	imageMockList,
	pastReservation,
	topListData,
	topMockData,
}: ReservationFormPT) {
	return (
		<div className="h-fit max-h-[314px] min-h-[198px] w-full justify-center rounded-[26px] py-[22px] shadow-customGray60">
			{pastReservation && pastReservation.length > 0 ? (
				recentReservation ? (
					<div className="flex flex-col gap-[16.5px] px-[25px]">
						<div className="text-Title03 font-Bold text-PB100">
							진행 중인 네일
						</div>
						<div className="flex gap-[16px]">
							<ReservationImageList imageList={imageMockList} />
							<ReservationInfo recentReservation={recentReservation} />
						</div>
					</div>
				) : (
					<div className="flex flex-col gap-[16.5px] px-[25px]">
						<div className="text-Title03 font-Bold text-PB100">
							진행 중인 네일
						</div>
						<div className="h-[220px] pt-[80px] text-center text-Title03 text-black">
							현재 예약한 네일이 없어요
						</div>
					</div>
				)
			) : recentReservation ? (
				<div className="flex h-full w-full pl-[25px] pr-[15px]">
					<div className="flex h-full flex-col gap-[16.5px] border-r-[1.5px] border-Gray20 pr-[40px]">
						<div className="text-Title03 font-Bold text-PB100">
							진행 중인 네일
						</div>
						<div className="flex gap-[16px]">
							<ReservationImageList imageList={imageMockList} />
							<ReservationInfo recentReservation={recentReservation} />
						</div>
					</div>
					<div className="flex h-full w-[640px] flex-col gap-[30px] pl-[15px]">
						<div className="text-Title03 font-Bold text-Black">
							요즘 가장 인기 있는 네일샵 둘러보기 🔎
						</div>
						<TopShopListForm
							topListData={topListData}
							topMockData={topMockData}
						/>
					</div>
				</div>
			) : (
				<div className="flex justify-between pl-[25px] pr-[44px]">
					<div className="flex flex-col gap-[27px]">
						<div className="text-Title03 font-Bold text-PB100">
							진행 중인 네일
						</div>
						<div className="flex flex-col gap-[1px]">
							<div className="text-Title03 text-black">
								현재 예약한 네일이 없어요.
							</div>
							<div className="text-Title03 font-Bold text-Black">
								요즘 가장 인기 있는 네일샵 둘러보기 🔎
							</div>
						</div>
					</div>
					<div className="h-fit w-[650px] border-l-[1.5px] border-Gray20 pl-[33px]">
						<TopShopListForm
							topListData={topListData}
							topMockData={topMockData}
						/>
					</div>
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
						fill
						priority
						sizes="40px"
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
							fill
							priority
							sizes="40px"
						/>
					</div>
				))}
			</div>
		</div>
	)
}
type ReservationInfoPT = {
	recentReservation: TRecentReservation
}
function ReservationInfo({ recentReservation }: ReservationInfoPT) {
	return (
		<div className="flex h-fit w-full flex-col gap-[17px]">
			<InfoForm recentReservation={recentReservation} />
			<InfoButtonFrom recentReservation={recentReservation} />
		</div>
	)
}
type InfoFormPT = {
	recentReservation: TRecentReservation
}
function InfoForm({ recentReservation }: InfoFormPT) {
	const dataList = recentReservation.details
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

		return tags.slice(0, 5).join(", ")
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
		<div className="flex h-[152px] flex-col gap-[12px] border-b-[1.5px] border-Gray10 pb-[25px]">
			<NTContent mode="day" className="px-[15.5px]">
				{status}
			</NTContent>
			<div className="flex flex-col gap-[6px]">
				<div className="text-Body01 font-SemiBold text-Gray100">
					{recentReservation.shop.name}
				</div>
				<div className="text-Body02 font-SemiBold text-PB100">
					{timestampFuntion(dataList[0].startTime)}
					{dataList[0].endTime ? `${endReservation(dataList[0].endTime)}` : ""}
				</div>
				<div className="line-clamp-1 text-Body02 text-Gray100">
					{tagListFuntion()}
				</div>
			</div>
		</div>
	)
}
function InfoButtonFrom({ recentReservation }: ReservationInfoPT) {
	return (
		<div className="flex w-full items-center justify-end pr-[2px]">
			<InfoButtonList recentReservation={recentReservation} />
			{/* <div className="flex h-fit items-center gap-[11px] text-Button font-Medium text-Gray60">예약상세 바로가기 ></div> */}
		</div>
	)
}
function InfoButtonList({ recentReservation }: ReservationInfoPT) {
	const { updateReservation } = useUpdateReservationMutation(
		recentReservation.shop.id,
	)
	const handleUpdateReservation = async () => {
		const status: TReservationStatus = "CANCELED"

		const updatedData: TReqBodyUpdateReservation = {
			status,
			reservationDetailDtoList: [],
		}
		try {
			await updateReservation({
				reservationId: recentReservation.reservationId,
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
		<div className="flex gap-[22px]">
			<Toaster position="top-center" />
			<NTButton variant="secondary" flexible="fit" onClick={onClickCloseToast}>
				예약취소
			</NTButton>
		</div>
	)
}
type TopShopListFormPT = {
	topListData: Array<TResShop>
	topMockData: Array<TShop>
}
function TopShopListForm({ topListData = [], topMockData }: TopShopListFormPT) {
	const router = useRouter()
	const [currentIndex, setCurrentIndex] = useState(0)
	const sliceData = topListData.slice(currentIndex, currentIndex + 2)
	const handleNextClick = () => {
		setCurrentIndex((prevIndex) => {
			const newIndex = prevIndex + 2
			return newIndex >= 4 ? 0 : newIndex
		})
	}

	return (
		<div className="flex w-full items-center justify-between">
			<div className="flex gap-[15px]">
				{sliceData.map((data, idx) => (
					<div
						className="relative z-10 flex h-[156px] w-[282px] items-end"
						key={idx}
					>
						<div className="absolute inset-0 z-20 rounded-[22px] bg-gradient-to-r from-Black to-White opacity-[0.4]" />
						<Image
							src={topMockData[idx].images}
							alt={data.name}
							fill
							priority
							sizes="282px"
							className="rounded-[22px]"
						/>
						<div
							className="absolute top-[62.5px] z-20 w-full cursor-pointer text-center text-Headline01 font-Bold text-PY100 hover:text-PY50"
							onClick={() => {
								router.push(`shop/${data.id}`)
							}}
						>
							{data.name}
						</div>
					</div>
				))}
			</div>
			<NTIcon
				icon="expandRightLight"
				className="w-[30px] cursor-pointer hover:text-Gray60"
				onClick={handleNextClick}
			></NTIcon>
		</div>
	)
}
type PastHistoryFormPT = {
	pastReservationImage: Array<{ month: number; image: string }>
	pastReservation: Array<TResCompletedReservation>
}
function PastHistoryForm({
	pastReservationImage,
	pastReservation,
}: PastHistoryFormPT) {
	return (
		<div className="flex h-fit w-fit min-w-[486px] flex-col justify-center gap-[21.5px] rounded-[26px] px-[21px] pb-[20px] pt-[22px] shadow-customGray60">
			<div className="text-Title03 font-SemiBold text-Gray100">
				다시 돌아보는 지난 네일
			</div>
			<PastHistoryImageList
				pastReservationImage={pastReservationImage}
				pastReservation={pastReservation}
			/>
		</div>
	)
}
type PastHistoryImageListPT = {
	pastReservationImage: Array<{ month: number; image: string }>
	pastReservation: Array<TResCompletedReservation>
}
function PastHistoryImageList({
	pastReservationImage,
	pastReservation,
}: PastHistoryImageListPT) {
	const slicePastList = pastReservation.slice(0, 2)
	return (
		<div className="flex gap-[12px]">
			<div className="relative flex h-[220px] w-[326px] items-end pb-[20px] pl-[22px]">
				<div className="absolute inset-0 z-10 rounded-l-[26px] bg-gradient-to-t from-Black to-White opacity-[0.52]" />
				<Image
					src={pastReservationImage[0].image}
					alt={pastReservationImage[0].month.toString()}
					fill
					className="rounded-l-[26px]"
					priority
					sizes="326px"
				/>
				<div className="z-20 flex h-[30px] items-center gap-[3px] text-Title03 font-SemiBold text-White">
					<span>{pastReservationImage[0].month}월 카타네일</span>
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
							src={pastReservationImage[idx + 1].image}
							alt={pastReservationImage[idx + 1].month.toString()}
							fill
							priority
							sizes="106px"
							className="rounded-r-[26px]"
						/>
						<div className="absolute z-20 text-Headline02 text-Gray10">
							{pastReservationImage[idx + 1].month}월
						</div>
					</div>
				))}
			</div>
		</div>
	)
}
