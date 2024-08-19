import { useRef, useState } from "react"

import { NTButton } from "@/component/common/atom/nt-button"
import {
	ModalContent,
	ModalFooter,
	ModalHeader,
} from "@/component/common/nt-modal"
import { useGetMonthlyArtList, useMutateAOM } from "@/hook/use-aom"
import { isUndefined } from "@/util/common/type-guard"

import {
	createAOMFormData,
	createInitIdsArr,
	getAOMModalBtnText,
} from "./aom-manage-modal.util"
import { EditAOM } from "./edit-aom"
import { RegisterGuide } from "./register-guide"

export default function AOMManageModal() {
	const [isGuideVisible, setIsGuideVisible] = useState(true)

	const { data: AOMData, isLoading } = useGetMonthlyArtList(1)
	const { mutate: AOMMutate } = useMutateAOM()

	const [previewImageArr, setPreviewImageArr] = useState(
		AOMData?.dataList || [],
	)

	const keepIdArr = useRef(createInitIdsArr(AOMData?.dataList || []))
	const removeIdArr = useRef<Array<number>>([])
	const modalBtnText = getAOMModalBtnText(isGuideVisible)

	if (isLoading || isUndefined(AOMData)) return
	const onClickRegisterBtn = async () => {
		const formData = createAOMFormData(
			previewImageArr,
			keepIdArr.current,
			removeIdArr.current,
		)
		AOMMutate({ shopId: 1, formData: formData })
	}

	return (
		<ModalContent className="flex flex-col gap-y-3">
			<ModalHeader className="flex w-full items-center justify-center text-Title01 font-Bold text-Gray80">
				이달의 아트
			</ModalHeader>
			<div className="relative h-full w-full">
				<RegisterGuide isGuideVisible={isGuideVisible} />
				<EditAOM
					isGuideVisible={!isGuideVisible}
					previewImageArr={previewImageArr}
					setPreviewImageArr={setPreviewImageArr}
					keepIdArr={keepIdArr.current}
					removeIdArr={removeIdArr.current}
				/>
			</div>
			<ModalFooter className="flex w-full items-center justify-center">
				<NTButton
					flexible={"fit"}
					onClick={() => {
						if (isGuideVisible) {
							setIsGuideVisible(false)
						} else {
							onClickRegisterBtn()
						}
					}}
				>
					{modalBtnText}
				</NTButton>
			</ModalFooter>
		</ModalContent>
	)
}
