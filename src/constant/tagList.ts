import type { TNailCondition } from "@/type/union-option/nail-condition"
import type { TNailTreatment } from "@/type/union-option/nail-treatment"
import type { TRemoveOption } from "@/type/union-option/remove-option"

export const CONDITION_LIST: { [key in TNailCondition]: string } = {
	REPAIR: "손톱 보수 필요",
	AS: "A/S 필요",
	WOUND_CARE: "상처 있음",
	CORRECTION: "교정 필요",
} as const
export const TREATMENT_LIST: { [key in TNailTreatment]: string } = {
	AOM: "이달의 아트",
	CARE: "관리",
	ONE: "원 컬러",
	MEMBER_IMAGE: "등록된사진",
} as const
export const REMOVE_LIST: { [key in TRemoveOption]: string } = {
	IN_SHOP: "쟈샵 제거 필요",
	ELSE_WHERE: "타샵 제거 필요",
	NO_NEED: "제거 필요 없음",
} as const
