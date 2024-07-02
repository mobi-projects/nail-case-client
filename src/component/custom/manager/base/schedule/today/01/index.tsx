"use client"

import type { Dayjs } from "dayjs"
import dayjs from "dayjs"
import React from "react"

import { NTButton } from "@/component/common/atom/nt-button"
import NTNameBox from "@/component/common/nt-name-box"
import NTOption from "@/component/common/nt-option"

type Artist = {
	name: string
	optionArr: string[]
}

type Slot = {
	firstTime: number
	endTime: number
	artistArr: Artist[]
}

type DayScheduleTimePT = {
	slot: Slot
	currentTime: Dayjs
}

type DayScheduleDashPT = {
	slot: Slot
}

type DayScheduleTaskPT = {
	slot: Slot
	duration: number
}

type DayScheduleOptionsPT = {
	optionArr: string[]
}

export default function DayScheDule() {
	const reservation: Slot[] = [
		{
			firstTime: 11,
			endTime: 13,
			artistArr: [
				{
					name: "모비쌤",
					optionArr: [
						"이달의 아트",
						"동반 2인",
						"타샵 제거 있음",
						"1인 연장 필요",
					],
				},
				{
					name: "비모쌤",
					optionArr: [
						"이달의 아트",
						"동반 2인",
						"타샵 제거 있음",
						"1인 연장 필요",
					],
				},
			],
		},
		{
			firstTime: 15,
			endTime: 16,
			artistArr: [
				{
					name: "모비쌤",
					optionArr: ["이달의 아트", "동반 2인", "타샵 제거 있음"],
				},
			],
		},
		{
			firstTime: 16,
			endTime: 17,
			artistArr: [
				{
					name: "비모쌤",
					optionArr: ["이달의 아트", "동반 2인", "타샵 제거 있음"],
				},
			],
		},
		{
			firstTime: 17,
			endTime: 18,
			artistArr: [
				{
					name: "비모쌤",
					optionArr: ["이달의 아트", "동반 2인", "타샵 제거 있음"],
				},
			],
		},
		{
			firstTime: 18,
			endTime: 19,
			artistArr: [
				{
					name: "모비쌤",
					optionArr: ["이달의 아트", "동반 2인", "타샵 제거 있음"],
				},
			],
		},
		{
			firstTime: 19,
			endTime: 20,
			artistArr: [
				{
					name: "미지정",
					optionArr: ["이달의 아트", "동반 2인", "타샵 제거 있음"],
				},
			],
		},
	]

	const currentTime = dayjs()

	return (
		<div className="flex h-fit w-full flex-col rounded-[26px] border shadow-customGray60">
			<div className="flex flex-col">
				{reservation
					.filter((slot) =>
						dayjs().hour(slot.endTime).minute(0).isAfter(currentTime),
					)
					.map((slot, idx) => (
						<DayScheduleTime key={idx} slot={slot} currentTime={currentTime} />
					))}
			</div>
			<div className="mt-[20px] flex h-[65px] w-full justify-center text-Headline02 text-Gray50">
				근무 종료
			</div>
		</div>
	)
}

function DayScheduleTime({ slot, currentTime }: DayScheduleTimePT) {
	const duration = slot.endTime - slot.firstTime
	const boxHeight = 120 * duration

	return (
		<div
			className={`flex w-full items-center border-b-[2px] border-Gray10 h-[${boxHeight}px]`}
		>
			<DayScheduleDash slot={slot} />
			<DayScheduleTask slot={slot} duration={duration} />
			<DayScheduleButton slot={slot} currentTime={currentTime} />
		</div>
	)
}

function DayScheduleDash({ slot }: DayScheduleDashPT) {
	const hours = []
	for (let i = slot.firstTime; i <= slot.endTime; i++) {
		hours.push(i)
		if (i < slot.endTime) {
			hours.push("dash")
		}
	}

	return (
		<div className="flex w-[75px] flex-col items-center justify-center">
			{hours.map((item, index) => (
				<div
					key={index}
					className="flex h-full flex-col items-center justify-center"
				>
					{item === "dash" ? (
						<div className="flex w-full flex-1 items-center justify-center">
							<div className="h-[30px] border-l-2 border-dashed border-Gray30 py-[18px]"></div>
						</div>
					) : (
						<span className="text-Headline02 text-Gray40">{item}</span>
					)}
				</div>
			))}
		</div>
	)
}

function DayScheduleTask({ slot, duration }: DayScheduleTaskPT) {
	const height = duration === 2 ? 160 : 86
	const subHeight = duration === 2 ? 132.7 : 56.54
	const startTime = dayjs().hour(slot.firstTime).minute(0)
	const period = startTime.format("A") === "AM" ? "오전" : "오후"
	const formattedFirstTime = startTime.format("h")

	const getBgColor = (artist: string) => {
		switch (artist) {
			case "모비쌤":
				return "BGblue"
			case "비모쌤":
				return "PY"
			case "미지정":
				return "Gray"
			default:
				return "Gray"
		}
	}

	return (
		<div
			className={`flex w-[792px] items-center rounded-[20px] border h-[${height}px] shadow-customGray60`}
		>
			<div
				className={`mr-[15px] border-r-[2px] border-Gray20 pl-[20px] pr-[40px] h-[${subHeight}px]`}
			>
				<div className="text-Headline02 text-Gray90">
					{period} {formattedFirstTime}시
				</div>
				<div className="text-Callout text-Gray40">
					{slot.endTime - slot.firstTime}시간
				</div>
			</div>
			<div className="mr-[15px] flex flex-col gap-2">
				{slot.artistArr.map((artist, idx) => (
					<React.Fragment key={idx}>
						<div className="flex items-center gap-2">
							<NTNameBox bgColor={getBgColor(artist.name)}>
								{artist.name}
							</NTNameBox>
							<DayScheduleOptions optionArr={artist.optionArr} />
						</div>
						{idx < slot.artistArr.length - 1 && (
							<div className="my-1 border-t-[2px] border-Gray10"></div>
						)}
					</React.Fragment>
				))}
			</div>
		</div>
	)
}

function DayScheduleOptions({ optionArr }: DayScheduleOptionsPT) {
	return <NTOption optionArr={optionArr} gap={2} />
}

function DayScheduleButton({ slot, currentTime }: DayScheduleTimePT) {
	const startTime = dayjs().hour(slot.firstTime).minute(0)
	const endTime = dayjs().hour(slot.endTime).minute(0)
	const isCurrent =
		currentTime.isAfter(startTime) && currentTime.isBefore(endTime)

	return (
		<div className="flex h-full w-[300px] items-center justify-end">
			{isCurrent ? (
				<NTButton disabled>시술중</NTButton>
			) : (
				<div className="flex gap-2">
					<NTButton variant="secondary" flexible="fit">
						변경하기
					</NTButton>
					<NTButton variant="primary" flexible="fit">
						채팅하기
					</NTButton>
				</div>
			)}
		</div>
	)
}
