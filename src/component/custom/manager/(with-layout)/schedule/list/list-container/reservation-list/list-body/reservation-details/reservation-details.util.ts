import { CONDITION_LIST, TREATMENT_LIST } from "@/constant/tagList"
import type { TNailCondition } from "@/type/union-option/nail-condition"
import type { TNailTreatment } from "@/type/union-option/nail-treatment"

/** 시술 옵션을 배열 형태로 반환 */
export const getTreatmentLabels = (treatmentOptions: TNailTreatment[]) =>
	treatmentOptions.map((option) => TREATMENT_LIST[option])
/** 연장 필요 유무를 ui 출력 형태로 반환 */
export const getExtendLabel = (extend: boolean) =>
	extend ? "연장 필요" : "연장 필요 없음"
/** 컨디션 옵션을 배열형태로 반환, 없다면 빈배열 반환 */
export const getConditionLabels = (
	isConditionOptions: boolean,
	conditionOptions: TNailCondition[] | null,
) => {
	if (isConditionOptions)
		return conditionOptions!.map((option) => CONDITION_LIST[option])
	return []
}
/** 빈배열이라면 true 반환 */
export const isEmptyArr = <T>(array: Array<T>) => array.length === 0
