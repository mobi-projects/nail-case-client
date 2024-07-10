"use client"

import NTOption from "@/component/common/nt-option"
import type { TNailCondition } from "@/type/union-option/nail-condition"
import type { TNailTreatment } from "@/type/union-option/nail-treatment"
import type { TRemoveOption } from "@/type/union-option/remove-option"

type TReservationOptions<T> = {
	labelArr: Array<string>
	valueArr: Array<T>
}
const TREATMENT_OPTIONS: TReservationOptions<TNailTreatment> = {
	labelArr: ["이달의 아트", "케어", "원 컬러", "사진등록"],
	valueArr: ["AOM", "CARE", "ONE", "MEMBER_IMAGE"],
} as const
const REMOVE_OPTIONS: TReservationOptions<TRemoveOption> = {
	labelArr: ["자샵 제거 필요", "타샵 제거 필요", "제거 필요 없음"],
	valueArr: ["IN_SHOP", "ELSE_WHERE", "NO_NEED"],
} as const
const EXTENSION_OPTIONS: TReservationOptions<boolean> = {
	labelArr: ["연장 필요", "연장 필요 없음"],
	valueArr: [true, false],
} as const
const CONDITION_OPTIONS: TReservationOptions<TNailCondition> = {
	labelArr: ["손톱 보수 필요", "A/S 필요", "상처 있음", "교정 필요"],
	valueArr: ["REPAIR", "AS", "WOUND_CARE", "CORRECTION"],
} as const

export default function TreatmentNCondition() {
	return (
		<div className="flex h-fit w-full flex-col gap-[30px] rounded-[26px] border border-Gray10 p-6 shadow-customGray60">
			<div className="flex flex-col gap-[10px]">
				<SectionTitle title="시술 내용" isEssential={true} />
				<NTOption optionArr={TREATMENT_OPTIONS.labelArr} />
			</div>
			<div className="flex flex-col gap-[8px]">
				<SectionTitle title="네일 제거 유무" isEssential={true} />
				<NTOption optionArr={REMOVE_OPTIONS.labelArr} />
			</div>
			<div className="flex flex-col gap-[8px]">
				<SectionTitle title="연장 유무" isEssential={true} />
				<NTOption optionArr={EXTENSION_OPTIONS.labelArr} />
			</div>
			<div className="flex flex-col gap-[8px]">
				<SectionTitle title="컨디션" />
				<NTOption optionArr={CONDITION_OPTIONS.labelArr} />
			</div>
		</div>
	)
}

function SectionTitle({
	title,
	isEssential = false,
	additionalNotice,
}: {
	title: string
	isEssential?: boolean
	additionalNotice?: string
}) {
	return (
		<div className="flex h-fit w-full gap-[1px]">
			<p className="text-Headline02 text-Gray80">{title}</p>
			{isEssential && (
				<div className="aspect-square h-[4px] self-start rounded-full bg-PB100" />
			)}
			{additionalNotice && (
				<p className="self-center text-Caption02 text-Gray40">
					{additionalNotice}
				</p>
			)}
		</div>
	)
}
