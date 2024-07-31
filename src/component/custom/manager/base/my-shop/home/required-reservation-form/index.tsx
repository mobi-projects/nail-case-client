"use client"

import NTIcon from "@/component/common/nt-icon"
import NTOption from "@/component/common/nt-option"
import Slider from "@/component/common/nt-slider"

type CategoryOptionsPT = {
	title: string
	options: string[]
	showSlider?: boolean
}

export default function RequiredReservationInfo() {
	return (
		<div className="flex justify-between pb-[30px]">
			<LeftInfo />
			<RightInfo />
		</div>
	)
}

function LeftInfo() {
	const categories = [
		{
			title: "시술 내용",
			options: ["이달의 아트", "케어", "원 컬러", "사진 등록"],
		},
		{
			title: "네일 제거 유무",
			options: ["자샾 제거 필요", "타샾 제거 필요", "제거 필요 없음"],
		},
		{
			title: "연장 유무",
			options: ["연장 필요", "연장 필요 없음"],
		},
		{
			title: "컨디션",
			options: ["손톱 보수 필요", "A/S 필요", "상처 있음", "교정 필요"],
		},
	]

	return (
		<div className="flex h-[586px] w-[690px] flex-col justify-center rounded-[26px] px-[25px] shadow-customGray70">
			<NTIcon
				icon="sortArrowLight"
				className="mb-[10px] w-[20px] cursor-pointer text-PB100"
			/>
			{categories.map((category, index) => (
				<div key={index} className="py-[10px]">
					<LeftCategoryOptions
						title={category.title}
						options={category.options}
					/>
					{index < categories.length - 1 && (
						<div className="mt-[25px] border-t-[0.5px] border-Gray10" />
					)}
				</div>
			))}
		</div>
	)
}

function LeftCategoryOptions({ title, options }: CategoryOptionsPT) {
	return (
		<div>
			<div className="pb-[5px] text-Headline02 text-Gray80">{title}</div>
			<NTOption optionArr={options} size="large" />
		</div>
	)
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
		<div className="flex h-[586px] w-[486px] flex-col justify-center rounded-[26px] px-[25px] shadow-customGray70">
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

function RightCategoryOptions({
	title,
	options,
	showSlider,
}: CategoryOptionsPT) {
	return (
		<>
			<div className="mb-[10px] text-Headline02 text-Gray70">{title}</div>
			<NTOption
				optionArr={options}
				disabledIdxArr={[0, 1, 2, 3, 4]}
				size="large"
			/>
			{showSlider && (
				<div className="mt-[20px]">
					<Slider upperLimit={10} curValue={0} disabled />
				</div>
			)}
		</>
	)
}
