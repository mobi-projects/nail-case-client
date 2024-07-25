"use client"

import NTIcon from "@/component/common/nt-icon"
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

type CardHeaderPT = {
	title: string
}

export default function MyShopInfo() {
	const { data, isError, error, isLoading } = useWorkHours(1)
	const {
		data: infoData,
		isError: infoIsError,
		error: infoError,
		isLoading: infoIsLoading,
	} = useShopInfo(1)

	if (isError) {
		return <div>Error: {error.message}</div>
	}
	if (isLoading) {
		return <div>Loading...</div>
	}
	if (infoIsError) {
		return <div>Error: {infoError.message}</div>
	}
	if (infoIsLoading) {
		return <div>Loading...</div>
	}
	const workDataList = data?.dataList as TReseGetWortHours[]
	console.log(workDataList)
	const shopData = infoData?.data as TResGetShopInfo

	console.log(shopData)
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
	const days = ["월", "화", "수", "목", "금", "토", "일"]
	const openDays = workDataList.filter((data) => data.isOpen)
	const workWeek = openDays.map((data) => days[data.dayOfWeek]).join(" ")
	const groupedByHours = openDays.reduce<{
		[key: string]: TReseGetWortHours[]
	}>((acc, data) => {
		const key = `${data.openTime}-${data.closeTime}`
		if (!acc[key]) {
			acc[key] = []
		}
		acc[key].push(data)
		return acc
	}, {})

	const workDay = Object.values(groupedByHours).map((group) => {
		group.sort((a, b) => a.dayOfWeek - b.dayOfWeek)

		const ranges = []
		let start = group[0].dayOfWeek
		let end = group[0].dayOfWeek

		for (let i = 1; i < group.length; i++) {
			if (group[i].dayOfWeek === end + 1) {
				end = group[i].dayOfWeek
			} else {
				ranges.push(start === end ? days[start] : `${days[start]}-${days[end]}`)
				start = group[i].dayOfWeek
				end = group[i].dayOfWeek
			}
		}
		ranges.push(start === end ? days[start] : `${days[start]}-${days[end]}`)

		const openTime = new Date(group[0].openTime * 1000).toLocaleTimeString([], {
			hour: "2-digit",
			minute: "2-digit",
		})
		const closeTime = new Date(group[0].closeTime * 1000).toLocaleTimeString(
			[],
			{ hour: "2-digit", minute: "2-digit" },
		)

		return `${ranges.join(", ")}\n${openTime} ~${closeTime}`
	})
	return (
		<div className="flex h-[164px] w-[282px] flex-col rounded-[26px] px-[25px] py-[15px] shadow-customGray80">
			<CardHeader title="영업시간" />
			<div className="ml-[-12px]">
				<div className="list-disc">
					<div className="flex items-center">
						<NTIcon icon="dot" className="text-Gray60" />
						{workWeek}
					</div>
					{workDay.map((data, idx) => (
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
	const { data, isError, error, isLoading } = useShopById(1)

	if (isError) {
		return <div>Error: {error.message}</div>
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
