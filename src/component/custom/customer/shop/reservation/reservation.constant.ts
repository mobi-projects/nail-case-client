import type { TNailCondition } from "@/type/union-option/nail-condition"
import type { TNailTreatment } from "@/type/union-option/nail-treatment"
import type { TRemoveOption } from "@/type/union-option/remove-option"

export const TREATMENT_OPTIONS: TReservationOptions<TNailTreatment> = {
	labelArr: ["이달의 아트", "케어", "원 컬러", "사진등록"],
	valueArr: ["AOM", "CARE", "ONE", "MEMBER_IMAGE"],
} as const

export const REMOVE_OPTIONS: TReservationOptions<TRemoveOption> = {
	labelArr: ["자샵 제거 필요", "타샵 제거 필요", "제거 필요 없음"],
	valueArr: ["IN_SHOP", "ELSE_WHERE", "NO_NEED"],
} as const
export const EXTENSION_OPTIONS: TReservationOptions<boolean> = {
	labelArr: ["연장 필요", "연장 필요 없음"],
	valueArr: [true, false],
} as const
export const CONDITION_OPTIONS: TReservationOptions<TNailCondition> = {
	labelArr: ["손톱 보수 필요", "A/S 필요", "상처 있음", "교정 필요"],
	valueArr: ["REPAIR", "AS", "WOUND_CARE", "CORRECTION"],
} as const

type TReservationOptions<T> = {
	labelArr: Array<string>
	valueArr: Array<T>
}
