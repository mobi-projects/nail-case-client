import type { Dispatch, SetStateAction } from "react"

import { NTButton } from "@/component/common/atom/nt-button"
import { useModal } from "@/component/common/nt-modal/nt-modal.context"
import type { TResAOM } from "@/util/api/list-monthly-art"

import { hasAOMImages } from "../aom.utils"

import AOMImageList from "./aom-image-list"
import AOMManageModal from "./aom-manage-modal"

type AOMImageListPT = {
	aomInfoArr: TResAOM
	focusedIdx: number
	setFocusedIdx: Dispatch<SetStateAction<number>>
}

export default function AOMImageListSection({
	aomInfoArr,
	focusedIdx,
	setFocusedIdx,
}: AOMImageListPT) {
	const { onOpenModal } = useModal()
	const onClickEditBtn = () => {
		onOpenModal({
			size: "large",
			isX: false,
			children: <AOMManageModal />,
		})
	}
	return hasAOMImages(aomInfoArr) ? (
		<div className="flex h-full w-full flex-col rounded-r-2xl p-4 max-md:min-h-[250px] max-lg:gap-y-2">
			<p className="text-Title03 font-SemiBold md:text-[16px] max-sm:text-[14px]">
				등록된 사진
			</p>
			<p className="text-Title03 font-SemiBold text-PB100 md:text-[16px] max-sm:text-[14px]">{`${aomInfoArr.length}개`}</p>
			<AOMImageList
				aomInfoArr={aomInfoArr}
				focusedIdx={focusedIdx}
				setFocusedIdx={setFocusedIdx}
			/>
			<NTButton flexible={"fit"} size={"exSmall"} onClick={onClickEditBtn}>
				<span className="md:text-[16px] max-sm:text-[14px]">편집하기</span>
			</NTButton>
		</div>
	) : (
		<div className="flex h-full min-h-[200px] w-full flex-col items-center justify-center gap-y-3 rounded-2xl bg-White shadow-customGray80 max-md:rounded-b-2xl max-md:rounded-t-md">
			<p className="text-Title02 font-SemiBold text-Gray70">
				등록된 이달의 아트가 없어요.
			</p>
			<p className="text-Body02 text-Gray50">
				<span className="text-PB60">이달의 아트 등록</span> 버튼을 클릭해서
				사진을 등록해 주세요.
			</p>
		</div>
	)
}
