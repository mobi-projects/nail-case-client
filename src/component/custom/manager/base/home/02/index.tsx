"use client"
import { cva } from "class-variance-authority"

import { NTButton } from "@/component/common/atom/nt-button"
import NTIcon from "@/component/common/nt-icon"
import NTOption from "@/component/common/nt-option"
import { useOption } from "@/hook/use-component"

export default function ReservationForm() {
	return (
		<div className="mb-[9px] h-[646px] rounded-[26px] shadow-customGray60">
			<ReservationFormHeader />
			<hr className="border-Gray20" />
			<ReservationTimeList />
			<ReservationFormFooter />
		</div>
	)
}

function ReservationFormHeader() {
	return (
		<div className="flex h-[69px] items-center justify-center pb-[3px]">
			<NTIcon icon="expandLeftLight" className="text-Gray08"></NTIcon>
			<div className="text-Headline02 text-Gray50">5월 29일 (수)</div>
			<NTIcon icon="expandRightLight" className="text-Gray08"></NTIcon>
		</div>
	)
}

function ReservationTimeList() {
	const time = ["오전11", "오후3", "오후4", "오후5", "오후6"]

	return (
		<div className="h-full max-h-[508px] scroll-p-3 overflow-y-scroll">
			{time.map((time, idx) => {
				return (
					<div key={idx}>
						<div className="flex h-[127px] w-full items-center justify-between gap-[26.5px] px-[27px]">
							<ReservationTimeGap />
							<ReservationTagList time={time} idx={idx} />
							<ReservationButtonList idx={idx} />
						</div>
						<hr className="border border-Gray10" />
					</div>
				)
			})}
		</div>
	)
}
function ReservationTimeGap() {
	return (
		<ul className="flex w-[20px] flex-col gap-[2px]">
			<li className="text-center text-Headline02 font-Regular text-Gray40">
				11
			</li>
			<li className="text-center text-Headline02 font-Regular text-Gray40">
				12
			</li>
			<li className="text-center text-Headline02 font-Regular text-Gray40">
				13
			</li>
		</ul>
	)
}

const ReservationFormVariants = cva(
	"flex rounded-[20px] w-full max-w-[798.5px] h-[86px] items-center justify-between pl-[26px] pr-[17.5px]",
	{
		variants: {
			colorEffect: {
				true: "shadow-customCardPB border-PB100 border-[0.5px]",
				false: "shadow-customGray",
			},
		},
	},
)
type ReservationTimeListPT = {
	time?: string
	idx: number
}
function ReservationTagList({ time, idx }: ReservationTimeListPT) {
	const tag = ["이달의 아트 ", "동반2인", "타샵 제거 있음", "1인 연장 필요"]
	const { checkedOption, optionArr } = useOption(tag)
	return (
		<div
			className={ReservationFormVariants({
				colorEffect: idx === 0,
			})}
		>
			<div className="flex h-[56px] w-[88px] items-center justify-center border-r-2 border-Gray10">
				<div className="text-Headline02 text-Gray90">{time}</div>
			</div>
			<div className="w-full pl-[34px]">
				<NTOption itemsPerRow={4} {...{ checkedOption, optionArr }} />
			</div>
			<NTIcon icon="expandRight" className="h-[20px] w-[20px] text-Gray08" />
		</div>
	)
}
function ReservationButtonList({ idx }: ReservationTimeListPT) {
	return (
		<div className="ml-auto flex gap-[22px]">
			{idx === 0 && (
				<NTButton variant="primary" disabled size="medium" flexible="fit">
					시술중
				</NTButton>
			)}
			{idx === 1 && (
				<NTButton variant="primary" size="medium" flexible="fit">
					채팅하기
				</NTButton>
			)}
			{idx > 1 && (
				<>
					<NTButton variant="secondary" size="medium" flexible="fit">
						변경하기
					</NTButton>
					<NTButton variant="primary" size="medium" flexible="fit">
						채팅하기
					</NTButton>
				</>
			)}
		</div>
	)
}

function ReservationFormFooter() {
	return (
		<div className="flex h-[69px] w-full items-center justify-center text-Headline02 text-Gray50">
			근무 종료
		</div>
	)
}
