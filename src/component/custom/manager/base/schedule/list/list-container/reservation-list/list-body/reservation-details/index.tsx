import { REMOVE_LIST } from "@/constant/tagList"
import type { TNailCondition } from "@/type/union-option/nail-condition"
import type { TNailTreatment } from "@/type/union-option/nail-treatment"
import type { TRemoveOption } from "@/type/union-option/remove-option"
import type { TTreatmentImage } from "@/util/api-v2/list-reservation"
import { isNull } from "@/util/common/type-guard"

import { CustomDesignImages } from "./custom-design-images"
import { OptionSection } from "./option-section"
import {
	getConditionLabels,
	getExtendLabel,
	getTreatmentLabels,
	isEmptyArr,
} from "./reservation-details.util"

type ReservationOptionsPT = {
	treatmentDetail: {
		options: TNailTreatment[]
		images: TTreatmentImage[] | null
	}
	remove: TRemoveOption
	extend: boolean
	conditionOptions: TNailCondition[] | null
}

export function ReservationDetails({
	treatmentDetail,
	remove,
	extend,
	conditionOptions,
}: ReservationOptionsPT) {
	const { options: treatmentOptions, images: treatmentImages } = treatmentDetail
	const treatmentLabels = getTreatmentLabels(treatmentOptions)

	const isTreatmentImages =
		!isNull(treatmentImages) && !isEmptyArr(treatmentImages)

	const removeLabel = REMOVE_LIST[remove]
	const extendLabel = getExtendLabel(extend)

	const isConditionOptions =
		!isNull(conditionOptions) && !isEmptyArr(conditionOptions)
	const conditionLabels = getConditionLabels(
		isConditionOptions,
		conditionOptions,
	)

	return (
		<div className="flex flex-col gap-[20px] pl-2">
			<OptionSection
				required
				sectionTitle="시술 내용"
				options={treatmentLabels}
			/>
			{isTreatmentImages && <CustomDesignImages {...{ treatmentImages }} />}
			<OptionSection
				required
				sectionTitle="제거 유무"
				options={[removeLabel]}
			/>
			<OptionSection
				required
				sectionTitle="연장 유무"
				options={[extendLabel]}
			/>
			{isConditionOptions && (
				<OptionSection sectionTitle="컨디션" options={conditionLabels} />
			)}
		</div>
	)
}
