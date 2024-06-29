"use client"

import { NTButton } from "@/component/common/atom/nt-button"
import NTContent from "@/component/common/nt-content"
import NTIcon from "@/component/common/nt-icon"
import NTOption from "@/component/common/nt-option"

export default function ReservationCard() {
	return (
		<div className="flex h-[240px] w-full justify-between gap-[24px]">
			<WaitingCard />
			<ConfirmedCard />
		</div>
	)
}

function WaitingCard() {
	return (
		<div className="flex h-[240px] w-[792px] rounded-[26px] bg-White px-[5px] py-[19.5px] shadow-customGray60">
			<WaitingTotalCard />
			<WaitingDetailCard />
		</div>
	)
}

function WaitingTotalCard() {
	return (
		<div className="flex w-[239px] flex-col gap-[92px] border-r-[2px] border-Gray10 px-[28px] pb-[5.5px] pt-[5px]">
			<div className="flex gap-[15px] pr-[2px]">
				<NTIcon icon="deskAltLight" className="h-[46px] w-[46px] text-PB100" />
				<div>
					<div className="text-Title02 font-Bold">예약대기</div>
					<div className="text-Body01 text-Gray40">모비네일 한남점</div>
				</div>
			</div>
			<div className="pl-[10px] text-LargeTitle font-Bold text-PB100">2건</div>
		</div>
	)
}
function WaitingDetailCard() {
	return (
		<div className="flex h-full w-[542px] flex-col px-[21px]">
			<DetailDate />
			<hr className="w-full" />
			<DetailTagList />
		</div>
	)
}
function DetailDate() {
	return (
		<div className="flex w-full justify-between pb-4 pl-[15px] pr-[1px]">
			<div className="text-Title03 text-Gray70">5월 29일 (수) 오후1시</div>
			<NTContent mode="day">1/2</NTContent>
		</div>
	)
}
function DetailTagList() {
	return (
		<div className="flex h-full w-full justify-between pl-[4px] pr-[1px] pt-[13px]">
			<div className="flex h-full flex-col gap-y-4">
				<NTOption optionArr={["이달의 아트", "연장 필요"]} gap="gap-x-4" />
				<NTOption optionArr={["타샵 제거 있음"]} gap="gap-x-4" />
			</div>
			<div className="flex items-end">
				<NTButton icon="check" flexible="fit">
					예약 확정
				</NTButton>
			</div>
		</div>
	)
}

function ConfirmedCard() {
	return (
		<div className="relative flex h-[240px] w-[384px] flex-col justify-between rounded-[26px] bg-Gray90 px-[22.5px] py-[25px] shadow-customGray60">
			<ConfirmedCardHeader />
			<TotalConfirmed />
		</div>
	)
}
function ConfirmedCardHeader() {
	return (
		<div className="flex justify-between gap-[96.5px] pl-[7.5px]">
			<div className="flex gap-[18px]">
				<NTIcon
					icon="deskAltLight"
					className="mt-[2px] h-[46px] w-[46px] text-White"
				/>
				<div>
					<div className="text-Title02 font-Bold text-White">예약확정</div>
					<div className="text-Body01 text-Gray50">모비네일 한남점</div>
				</div>
			</div>
			<div className="flex h-[56px] w-[56px] items-center justify-center rounded-full bg-PB100">
				<NTIcon icon="arrowUp" className="h-[40px] w-[40px] text-White" />
			</div>
		</div>
	)
}
function TotalConfirmed() {
	return (
		<div className="pl-[4px] text-LargeTitle font-Bold text-PB100">8건</div>
	)
}
