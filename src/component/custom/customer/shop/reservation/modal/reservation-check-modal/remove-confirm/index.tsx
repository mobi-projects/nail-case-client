import NTOption from "@/component/common/nt-option"
import { REMOVE_LIST } from "@/constant/tagList"
import { type TRemoveOption } from "@/util/api/get-main-page-data"

type RemoveConfirmPT = { remove: TRemoveOption }

export default function RemoveConfirm({ remove }: RemoveConfirmPT) {
	return (
		<div className="grid h-full w-full grid-cols-[1fr_3.5fr] items-center border-b-[1px] border-b-Gray10">
			<p className="text-Body02 font-SemiBold text-Gray80">네일 제거 유무</p>
			<NTOption
				optionArr={[REMOVE_LIST[remove]]}
				optionClassName="font-Bold text-PB100"
			/>
		</div>
	)
}
