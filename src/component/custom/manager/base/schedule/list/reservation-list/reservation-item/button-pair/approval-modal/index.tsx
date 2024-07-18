import { useState } from "react"

import { NTButton } from "@/component/common/atom/nt-button"
import {
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,
} from "@/component/common/nt-modal"
import { useModal } from "@/component/common/nt-modal/nt-modal.context"
import { getBeforeOrAfterN } from "@/util/common"

import ConfirmApproval from "./confirm-approval"
import RequiredTimeCounting from "./required-time-counting"

type ApprovalModalPT = {
	startTime: number
	optionArr: string[][]
	companion: number
}

export default function ApprovalModal({
	startTime,
	companion,
}: ApprovalModalPT) {
	const { onCloseModal } = useModal()
	const [requiredTime, setRequiredTime] = useState(0)
	const endTime = getBeforeOrAfterN(startTime, requiredTime, "after", "minute")
	console.log(endTime)
	console.log(startTime + requiredTime * 60)

	const onClickIncreasingButton = () => {
		setRequiredTime((prev) => prev + 10)
	}
	const onClickDecreasingButton = () => {
		setRequiredTime((prev) => {
			if (prev <= 0) return prev
			return prev - 10
		})
	}

	return (
		<ModalContent>
			<ModalHeader className="h-[50px] w-full items-center border-b-[1.5px] border-Gray20 text-center text-Body01 font-SemiBold text-Gray90">
				[예약 수락]
			</ModalHeader>
			<ModalBody className="flex flex-col justify-center gap-[30px] pt-[10px]">
				<ConfirmApproval {...{ startTime, endTime, companion }} />
				<RequiredTimeCounting
					{...{
						requiredTime,
						onClickIncreasingButton,
						onClickDecreasingButton,
					}}
				/>
			</ModalBody>

			<ModalFooter className="flex flex-col justify-around gap-[5px]">
				<div className="flex w-full items-center justify-center gap-[10px]">
					<NTButton
						size="small"
						flexible="fit"
						variant="secondary"
						onClick={onCloseModal}
					>
						돌아가기
					</NTButton>
					<NTButton size="small" flexible="fit">
						거절하기
					</NTButton>
				</div>
			</ModalFooter>
		</ModalContent>
	)
}
