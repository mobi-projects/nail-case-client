"use client"
import NTOption from "@/component/common/nt-option"
import { useOption } from "@/hook/use-component"

export default function PreviewImages() {
	return (
		<div className="flex h-[480px] flex-col justify-between border-[5px] border-orange-300">
			<PreviewController />
			<Manager_Base_MyShop_Photo_02_02 />
		</div>
	)
}

function PreviewController() {
	const { checkedOption, onClickOption, optionArr } = useOption([
		["업체 사진", "이용자 사진"],
	])
	return (
		<div className="flex h-[96px] items-center justify-between pr-7">
			<NTOption
				checkedOption={checkedOption}
				onClickOption={onClickOption}
				gap="gap-x-4"
				optionArr={optionArr[0]}
			/>
			<span className="pt-6 text-Body02 font-SemiBold text-Gray30">
				전체보기
			</span>
		</div>
	)
}

function Manager_Base_MyShop_Photo_02_02() {
	return <div className="flex h-[384px] w-full border-[5px] border-green-300" />
}
