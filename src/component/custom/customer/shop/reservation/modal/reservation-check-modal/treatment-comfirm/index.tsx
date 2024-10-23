import NTOption from "@/component/common/nt-option"
import { TREATMENT_LIST } from "@/constant/tagList"
import { type TNailTreatment } from "@/type/union-option/nail-treatment"

type TreatmentConfirmPT = {
	treatment: {
		option: TNailTreatment | null
		imageId?: number
	}
}

export default function TreatmentConfirm({ treatment }: TreatmentConfirmPT) {
	return (
		<div className="grid h-full w-full grid-cols-[1fr_3.5fr] items-center border-b-[1px] border-b-Gray10">
			<p className="text-Body02 font-SemiBold text-Gray80 max-md:text-[12px]">
				시술 내용
			</p>
			<div className="flex items-center justify-start gap-x-8">
				<NTOption
					optionArr={[TREATMENT_LIST[treatment.option as TNailTreatment]]}
					optionClassName="font-Bold text-PB100 max-md:text-[12px] max-md:font-SemiBold"
				/>
			</div>
		</div>
	)
}
