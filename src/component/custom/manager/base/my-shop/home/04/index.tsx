"use client"

import NTIcon from "@/component/common/nt-icon"
import NTOption from "@/component/common/nt-option"
import { useOption } from "@/hook/use-component"

type CategoryOptionsPT = {
	title: string
	options: string[]
}

export default function Manager_Base_MyShop_Home_04() {
	return (
		<div className="flex justify-between pb-[30px]">
			<Manager_Base_MyShop_Home_04_01 />
			<Manager_Base_MyShop_Home_04_02 />
		</div>
	)
}

function Manager_Base_MyShop_Home_04_01() {
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
		<div className="flex h-[586px] w-[690px] flex-col justify-center rounded-[26px] border px-[25px] drop-shadow">
			<NTIcon
				icon="sortArrowLight"
				className="mb-[10px] w-[20px] cursor-pointer text-PB100"
			/>
			{categories.map((category, index) => (
				<div key={index} className="py-[10px]">
					<CategoryOptions title={category.title} options={category.options} />
					{index < categories.length - 1 && (
						<div className="mt-[25px] border-t-[0.5px] border-Gray10" />
					)}
				</div>
			))}
		</div>
	)
}

function CategoryOptions({ title, options }: CategoryOptionsPT) {
	const { onClickOption, optionArr, checkedOption } = useOption(options)

	return (
		<>
			<div className="pb-[5px] text-Headline02 text-Gray80">{title}</div>
			<NTOption
				onClickOption={onClickOption}
				optionArr={optionArr}
				checkedOption={checkedOption}
				itemsPerRow={4}
			/>
		</>
	)
}

function Manager_Base_MyShop_Home_04_02() {
	return <div />
}
