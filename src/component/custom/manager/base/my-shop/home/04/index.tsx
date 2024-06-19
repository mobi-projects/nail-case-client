"use client"

import NTOption from "@/component/common/nt-option"
import Slider from "@/component/common/nt-slider"
import { useOption } from "@/hook/use-component"

export default function Manager_Base_MyShop_Home_04() {
	return (
		<div className="flex justify-between pb-[30px]">
			<Manager_Base_MyShop_Home_04_01 />
			<Manager_Base_MyShop_Home_04_02 />
		</div>
	)
}
function Manager_Base_MyShop_Home_04_01() {
	return <div />
}
function Manager_Base_MyShop_Home_04_02() {
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

	// eslint-disable-next-line react-hooks/rules-of-hooks
	const optionsData = categories.map((category) => useOption(category.options))

	return (
		<div className="flex h-[586px] w-[486px] flex-col justify-center rounded-[26px] border px-[25px] drop-shadow">
			<div className="mt-[20px] flex justify-end"></div>
			{categories.map((category, index) => (
				<div key={index} className="mb-[15px]">
					{index === 0 && <div className="mt-[10px]"></div>}
					<div className="mb-[10px] text-Headline02 text-Gray70">
						{category.title}
					</div>
					<NTOption
						disabled
						onClickOption={optionsData[index].onClickOption}
						optionArr={optionsData[index].optionArr}
						checkedOption={optionsData[index].checkedOption}
						itemsPerRow={4}
					/>
					{index === 0 && (
						<div className="mt-[20px]">
							<Slider upperLimit={10} curValue={0} disabled />
						</div>
					)}
					{index < categories.length - 1 && (
						<div className="mt-[15px] border-t-[1.5px] border-Gray10"></div>
					)}
				</div>
			))}
		</div>
	)
}
