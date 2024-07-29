"use client"

import { NTButton } from "@/component/common/atom/nt-button"
import NTIcon from "@/component/common/nt-icon"
import { COMMON_HOME } from "@/constant/routing-path"
import {
	useShopById,
	useShopInfo,
	useWorkHours,
} from "@/hook/use-shop-controller"
import type {
	TReseGetWortHours,
	TResGetShopById,
	TResGetShopInfo,
} from "@/type/shop"
import {
	MultipleHourList,
	separateHourList,
	SingleHourList,
} from "@/util/common/workHour"

type CardHeaderPT = {
	title: string
}

export default function MyShopInfo() {
	const { data, isError, isLoading } = useWorkHours(1)
	const {
		data: infoData,
		isError: infoIsError,
		isLoading: infoIsLoading,
	} = useShopInfo(1)

	if (isLoading || infoIsLoading) {
		return <div>Loading...</div>
	}
	if (isError || infoIsError) {
		return (
			<div className="flex h-dvh w-full flex-col items-center justify-center gap-4">
				<h1 className="text-Title01 font-SemiBold text-PB100">
					죄송합니다. 접속 중 오류가 발생했습니다.
				</h1>
				<p className="text-Body01 text-Gray70">
					인터넷 연결 상태를 확인하시고 다시 시도해주세요.
				</p>
				<p className="text-Body01 text-Gray70">
					문제가 지속되면 고객 지원팀에 문의해주세요.
				</p>
				<NTButton
					variant={"primary"}
					size={"medium"}
					flexible={"fit"}
					onClick={() => (window.location.href = COMMON_HOME)}
				>
					홈으로
				</NTButton>
			</div>
		)
	}
	const workDataList = data?.dataList as TReseGetWortHours[]
	const shopData = infoData?.data as TResGetShopInfo
	return (
		<div className="flex justify-between">
			<InfoCardWorkingTime workDataList={workDataList} />
			<InfoCardLocation />
			<InfoCardNotification shopData={shopData} />
			<InfoCardPrice shopData={shopData} />
		</div>
	)
}

function CardHeader({ title }: CardHeaderPT) {
	return (
		<div className="flex w-full items-center justify-between border-b-[1.5px] border-Gray20 pb-[10px]">
			<div className="text-Headline02 text-Gray90">{title}</div>
			{/* <NTIcon
					icon="expandRightLight"
					className="h-[24px] w-[24px] cursor-pointer"
				/> */}
		</div>
	)
}
type InfoCardWorkingTimePT = {
	workDataList: Array<TReseGetWortHours>
}
function InfoCardWorkingTime({ workDataList }: InfoCardWorkingTimePT) {
	const days = ["일", "월", "화", "수", "목", "금", "토"]
	const openDays = workDataList.filter((data) => data.isOpen)
	const workWeek = openDays.map((data) => days[data.dayOfWeek]).join(" ")
	const { singleList, multipleList } = separateHourList(openDays)
	const formHourList = [
		...MultipleHourList(multipleList),
		...SingleHourList(singleList),
	] as string[]
	return (
		<div className="flex h-[164px] w-[282px] flex-col rounded-[26px] px-[25px] pb-[10px] pt-[15px] shadow-customGray80">
			<CardHeader title="영업시간" />
			<div className="mx-[-12px] h-[100px] overflow-y-scroll">
				<div className="flex flex-col justify-between">
					<div className="flex items-center">
						<NTIcon icon="dot" className="text-Gray60" />
						{workWeek}
					</div>
					{formHourList.map((data, idx) => (
						<div className="flex items-center" key={idx}>
							<NTIcon icon="dot" className="text-Gray60" />
							<span className="text-Body01 text-Gray60">{data}</span>
						</div>
					))}
				</div>
			</div>
		</div>
	)
}
function InfoCardLocation() {
	const { data, isError, isLoading } = useShopById(1)

	if (isError) {
		return <div>Error</div>
	}
	if (isLoading) {
		return <div>Loading...</div>
	}
	const shopData = data?.data as TResGetShopById
	const address = shopData.address.replace(/(로|동)(\d)/g, "$1\n$2 ")
	const addressParts = address.split("\n")

	return (
		<div className="flex h-[164px] w-[282px] flex-col rounded-[26px] px-[25px] py-[15px] shadow-customGray80">
			<CardHeader title="위치" />
			<div className="mt-[20px] w-[full]">
				{addressParts.map((part, idx) => (
					<div key={idx}>
						{part}
						<br />
					</div>
				))}
			</div>
		</div>
	)
}
type InfoCardNotificationPT = {
	shopData: TResGetShopInfo
}
function InfoCardNotification({ shopData }: InfoCardNotificationPT) {
	return (
		<div className="flex h-[164px] w-[282px] flex-col rounded-[26px] px-[25px] py-[15px] shadow-customGray80">
			<CardHeader title="안내사항" />
			<div className="ml-[-12px]">
				<div className="list-disc">
					<div className="flex items-center">
						<NTIcon icon="dot" className="text-Gray60" />
						{shopData.parkingLotCnt > 0 ? (
							<span>주차 가능 : {shopData.parkingLotCnt}대</span>
						) : (
							<span>주차 불가능</span>
						)}
					</div>
					<div className="flex items-center">
						<NTIcon icon="dot" className="text-Gray60" />
						{`${shopData.availableCnt}명 동시 예약 가능`}
					</div>
				</div>
			</div>
		</div>
	)
}
function InfoCardPrice({ shopData }: InfoCardNotificationPT) {
	return (
		<div className="flex h-[164px] w-[282px] flex-col rounded-[26px] px-[25px] py-[15px] shadow-customGray80">
			<CardHeader title="가격" />
			<div className="ml-[-12px]">
				<div className="list-disc">
					<div className="flex items-center">
						<NTIcon icon="dot" className="text-Gray60" /> 기본 가격
					</div>
					<div className="px-[10px] text-Gray60">{shopData.price}</div>
					<div className="flex items-center">
						<NTIcon icon="dot" className="text-Gray60" />
						<div className="cursor-pointer hover:text-Gray60 hover:underline">
							가격표 이미지로 보기
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
