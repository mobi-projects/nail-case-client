"use client"

import { useState } from "react"

import NTOption from "@/component/common/nt-option"
import { useAvailableTimeQuery } from "@/hook/use-reservation-controller"
import type { TResGetListAvailableTime } from "@/type"
import {
	getHourFromStamp,
	getMinFromStamp,
	padStartToPrinting,
} from "@/util/common"
import { isUndefined } from "@/util/common/type-guard"

type DesiredTimePT = {
	selectedStamp: number
	shopId: number
}

export default function DesiredTime({ shopId, selectedStamp }: DesiredTimePT) {
	const { data, isLoading, isError } = useAvailableTimeQuery(
		shopId,
		[1, 2, 3],
		selectedStamp,
	)
	const [selectedIdx, setSelectedIdx] = useState(-1)
	const [possibleArtistArr, setPossibleArtistArr] = useState<string[]>([])
	const [impossibleArtistArr, setImpossibleArtistArr] = useState<string[]>([])

	if (isLoading) {
		return (
			<div className="flex h-fit w-full items-center justify-center p-[30px] shadow-customGray60">
				<p>로딩 중..</p>
			</div>
		)
	}
	const availableInfoArr = data?.dataList
	if (isError || isUndefined(availableInfoArr)) {
		return (
			<div className="flex h-fit w-full items-center justify-center p-[30px] shadow-customGray60">
				<p>데이터를 정상적으로 불러오지 못했습니다.</p>
			</div>
		)
	}

	const onSelectedTime = (idx: number) => {
		const { artists } = availableInfoArr[idx]
		console.log(artists)
		setSelectedIdx(idx)
		setPossibleArtistArr(getPossibleArtistArr(artists))
		setImpossibleArtistArr(getImPossibleArtistArr(artists))
	}
	return (
		<div className="flex flex-col gap-[5px] py-6">
			<section className="grid h-[100px] grid-cols-[300px_auto_1fr] gap-[30px] pl-10">
				<div className="text-Callout text-PB110">
					<p className="text-Callout font-SemiBold">해당시간에 가능해요.</p>
					<ul className="list-disc pl-10 pt-2">
						{possibleArtistArr.map((artist) => (
							<li key={artist} className="text-Callout">
								{artist}
							</li>
						))}
					</ul>
				</div>
				<div className="text-Callout text-Gray60">
					<p className="text-Callout font-SemiBold">해당시간은 힘들어요.</p>
					<ul className="list-disc pl-10 pt-2">
						{impossibleArtistArr.map((artist) => (
							<li key={artist} className="text-Callout">
								{artist}
							</li>
						))}
					</ul>
				</div>
			</section>
			<NTOption
				optionArr={getBusinessTimeArr(availableInfoArr)}
				selectedIdxArr={[selectedIdx]}
				disabledIdxArr={getDisabledIdxArr(availableInfoArr, 2)}
				onSelect={onSelectedTime}
				className="w-full rounded-[26px] border border-Gray10 p-[30px] shadow-customGray60"
				size="large"
			/>
		</div>
	)
}
/** 매장의 모든 영업시간 출력 */
const getBusinessTimeArr = (availableInfoArr: TResGetListAvailableTime[]) =>
	availableInfoArr.map((availableInfo) => {
		const { startTime } = availableInfo
		const dayOfDivision = determineDayOfDivision(startTime)
		const hour = getHourFromStamp(startTime)
		const min = getMinFromStamp(startTime)
		const printedHour = convert12SystemHour(hour)
		const printedMin = padStartToPrinting("time", min)
		return [dayOfDivision, printedHour + ":" + printedMin].join(" ")
	})
/** 오후/오전 구분 */
const determineDayOfDivision = (timestamp: number) =>
	getHourFromStamp(timestamp) < 12 ? "오전" : "오후"
/** 24시간제 -> 12시간제 시간 변환 */
const convert12SystemHour = (hour: number) => {
	if (hour === 12) return "12"
	return padStartToPrinting("time", hour % 12)
}
/** 옵션 선택 불가 idx */
const getDisabledIdxArr = (
	availableInfoArr: TResGetListAvailableTime[],
	companion: number,
) => {
	const result: number[] = []
	availableInfoArr.forEach((availableInfo, idx) => {
		const { availableSeats, artists } = availableInfo
		/* 1. "동반인원" 이 "시술가능좌석" 보다 많을 경우, disabled */
		if (companion >= availableSeats) result.push(idx)
		/* 2. 해당 시간에 모든 아티스트가 불가능할 경우, disabled */
		const isAllImpassible = artists.reduce(
			(sum, artist) => sum && !artist.enable,
			true,
		)
		if (isAllImpassible) result.push(idx)
	})
	return result
}

type TArtist = {
	id: number
	nickname: string
	enable: boolean
	near: number | null
}
const getPossibleArtistArr = (artists: TArtist[]) => {
	const possibleArtistArr: string[] = []
	artists.forEach((artist) => {
		const { enable } = artist
		if (enable) possibleArtistArr.push(artist.nickname)
		return possibleArtistArr
	})
	return possibleArtistArr
}
const getImPossibleArtistArr = (artists: TArtist[]) => {
	const impossibleArtistArr: string[] = []
	artists.forEach((artist) => {
		const { enable } = artist
		if (!enable) impossibleArtistArr.push(artist.nickname)
	})
	return impossibleArtistArr
}
