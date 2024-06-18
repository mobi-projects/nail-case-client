"use client"
import { cva } from "class-variance-authority"

import { NTButton } from "@/component/common/atom/nt-button"
import NTIcon from "@/component/common/nt-icon"
import NTOption from "@/component/common/nt-option"
import { useOption } from "@/hook/use-component"

const ReservationFormVariants = cva(
	"flex rounded-[20px] w-full max-w-[798.5px] h-[86px] items-center justify-between pl-[26px] pr-[17.5px]",
	{
		variants: {
			timeTF: {
				true: "shadow-customCardPB",
				false: "shadow-customGray",
			},
		},
	},
)
export default function ReservationForm() {
	const time = ["오전11", "오후3", "오후4", "오후5"]
	const tag = ["이달의 아트 ", "동반2인", "타샵 제거 있음", "1인 연장 필요"]
	const timeTF = [true, false, false, false]
	const { checkedOption, onClickOption, optionArr } = useOption(tag)
	return (
		<div className="h-[646px] rounded-[26px] shadow-customGray60">
			<div className="flex h-[69px] items-center justify-center">
				<NTIcon icon="expandLeftLight" className="text-Gray08"></NTIcon>
				<div className="text-Headline02 text-Gray50">5월 29일 (수)</div>
				<NTIcon icon="expandRightLight" className="text-Gray08"></NTIcon>
			</div>
			<hr className="border-Gray20" />

			{time.map((time, index) => {
				return (
					<div key={index}>
						<div className="flex w-full items-center justify-between px-[28px] py-[19px]">
							<div className="flex w-fit gap-[26.5px]">
								<ul className="flex w-[20px] flex-col">
									<li className="text-Headline02 font-Regular text-Gray40">
										11
									</li>
									<li className="text-Headline02 font-Regular text-Gray40">
										12
									</li>
									<li className="text-Headline02 font-Regular text-Gray40">
										13
									</li>
								</ul>
								<div
									className={ReservationFormVariants({ timeTF: timeTF[index] })}
								>
									<div className="flex h-[56px] w-[88px] items-center justify-center border-r-2 border-Gray10">
										<div className="text-Headline02 text-Gray90">time</div>
									</div>
									<div className="w-full pl-[34px]">
										<NTOption
											{...{ checkedOption, optionArr, onClickOption }}
										/>
									</div>
									<NTIcon
										icon="expandRight"
										className="h-[20px] w-[20px] text-Gray08"
									/>
								</div>
							</div>
							<div className="flex gap-[22px]">
								{index === 0 && (
									<NTButton variant="primary" disabled size="exSmall">
										시술중
									</NTButton>
								)}
								{index === 1 && (
									<NTButton variant="primary" size="exSmall">
										채팅하기
									</NTButton>
								)}
								{index > 1 && (
									<>
										<NTButton variant="secondary" size="exSmall">
											변경하기
										</NTButton>
										<NTButton variant="primary" size="exSmall">
											채팅하기
										</NTButton>
									</>
								)}
							</div>
						</div>
						<hr className="border-Gray20" />
					</div>
				)
			})}

			<div className="flex h-[69px] items-center justify-center">
				<div className="text-Headline02 text-Gray50">근무종료</div>
			</div>
		</div>
	)
}