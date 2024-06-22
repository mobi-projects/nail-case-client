"use client"

import NTOption from "@/component/common/nt-option"
import Slider from "@/component/common/nt-slider"
import { useOption } from "@/hook/use-component"

export default function RequiredReservationInfo() {
	return (
		<div className="flex justify-between pb-[30px]">
			<LeftInfo />
			<RightInfo />
		</div>
	)
}

function LeftInfo() {
	return <div />
}

function RightInfo() {
	const categories = [
		{
			title: "커스텀",
			options: ["커스텀 필요"],
		},
		{
			title: "예약금",
			options: ["1만원", "2만원", "3만원", "4만원"],
		},
		{
			title: "회원권 유무",
			options: ["연장 필요", "연장 필요 없음"],
		},
		{
			title: "컨디션",
			options: ["영양 시술", "랩핑 필요"],
		},
	]

	return (
		<div className="flex h-[586px] w-[486px] flex-col justify-center rounded-[26px] border px-[25px] drop-shadow">
			<div className="mt-[20px] flex justify-end"></div>
			{categories.map((category, index) => (
				<div key={index} className="mb-[15px]">
					<RightCategoryOptions
						title={category.title}
						options={category.options}
						showSlider={index === 0}
					/>
					{index < categories.length - 1 && (
						<div className="mt-[15px] border-t-[0.5px] border-Gray10"></div>
					)}
				</div>
			))}
		</div>
	)
}

type CategoryOptionsPT = {
	title: string
	options: string[]
	showSlider?: boolean
}

function RightCategoryOptions({
	title,
	options,
	showSlider,
}: CategoryOptionsPT) {
	const { onClickOption, optionArr, checkedOption } = useOption(options)

	return (
		<>
			<div className="mb-[10px] text-Headline02 text-Gray70">{title}</div>
			<NTOption
				disabled
				onClickOption={onClickOption}
				optionArr={optionArr}
				checkedOption={checkedOption}
				itemsPerRow={4}
			/>
			{showSlider && (
				<div className="mt-[20px]">
					<Slider upperLimit={10} curValue={0} disabled />
				</div>
			)}
		</>
	)
}
