"use client"

import { useState } from "react"

import { cn } from "@/config/tailwind"
import { CONDITION_LIST, REMOVE_LIST, TREATMENT_LIST } from "@/constant/tagList"
import type { TReservationDetail, TResGetListReservation } from "@/type"
import type { TReservationStatus } from "@/type/union-option/resesrvation-status"

import ButtonPair from "./button-pair"
import NicknameNTime from "./nickname-n-time"
import OptionContents from "./options-for-member"

type ReservationItemPT = {
	reservation: TResGetListReservation
	status: TReservationStatus
}

export default function ReservationItem({
	reservation,
	status,
}: ReservationItemPT) {
	const [isSummary, setIsSummary] = useState(true)

	const repNickname = reservation.nickname // 대표자 닉네임
	const companion = reservation.reservationDetailList.length // 동반인원 (예약인원 확인)
	const detailList = reservation.reservationDetailList // 모든 동반인원에 대한 예약내용 목록

	const rep = detailList[0] // 대표자 예약 상세
	const startTime = rep.startTime // 시술 시작시간
	const endTime = rep.endTime // 시술 종료시간

	const nicknameArr = getNicknameArr(repNickname, companion) // 모든 동반인원 닉네임 배열
	const optionArr = getOptionsForMemberArr(
		reservation.reservationDetailList,
		companion,
	)

	return (
		<div
			className="grid h-fit min-h-[65px] w-full cursor-pointer grid-cols-[2fr_auto_8fr_auto_2fr] gap-[10px] rounded-[20px] bg-White px-[25px] py-[14px] drop-shadow transition-transform hover:scale-105"
			onClick={() => {
				setIsSummary((prev) => !prev)
			}}
		>
			<NicknameNTime
				nickname={nicknameArr[0]}
				{...{ companion, startTime, endTime }}
			/>
			<hr className="h-full rounded-full border-[1px] border-Gray20" />
			<OptionContents
				optionArr={optionArr}
				nicknameArr={nicknameArr}
				isSummary={isSummary}
			/>
			<hr
				className={cn(
					"h-full rounded-full border-[1px] border-transparent",
					!isSummary && companion !== 1 && "border-Gray20",
				)}
			/>
			<ButtonPair {...{ status, startTime, optionArr, companion }} />
		</div>
	)
}

const getNicknameArr = (nickname: string, companion: number) => {
	const nicknameArr = [nickname]
	for (let i = 1; i < companion; i++) nicknameArr.push(`동반인 ${i}`)
	return nicknameArr
}
const getOptionsForMemberArr = (
	reservationDetailList: TReservationDetail[],
	companion: number,
) => {
	const optionsForMember: string[][] = Array.from(
		{ length: companion },
		() => [],
	)
	for (let memberIdx = 0; memberIdx < companion; memberIdx++) {
		const detailForMember = reservationDetailList[memberIdx]
		/* 시술 내용 */
		detailForMember.treatmentList.forEach(({ option }) => {
			optionsForMember[memberIdx].push(TREATMENT_LIST[option])
		})
		/* 제거 유무 */
		optionsForMember[memberIdx].push(REMOVE_LIST[detailForMember.remove])
		/* 연장 유무 */
		optionsForMember[memberIdx].push(
			detailForMember.extend ? "연장 필요" : "연장 필요 없음",
		)
		/* 컨디션 */
		detailForMember.conditionList.forEach(({ option }) => {
			optionsForMember[memberIdx].push(CONDITION_LIST[option])
		})
	}
	return optionsForMember
}
