import { useMutation } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { useState } from "react"

import { NTButton } from "@/component/common/atom/nt-button"
import {
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,
} from "@/component/common/nt-modal"
import { useModal } from "@/component/common/nt-modal/nt-modal.context"
import { axiosInstance } from "@/config/axios"
import getQueryClient from "@/config/tanstack-query/get-query-client"
import { MANAGER_QUERY } from "@/config/tanstack-query/key-factory"
import { getBeforeOrAfterN } from "@/util/common"

import ErrorModal from "../error-modal"

import type {
	ApprovalModalPT,
	TReservationDetail,
	TReservationDetailList,
	useScheduleConfirmMutationFnPT,
} from "./approval-modal.type"
import PreApprovalSummary from "./pre-approval-summary"
import RequiredTimeCounting from "./required-time-counting"

export default function ApprovalModal({
	shopId,
	reservationId,
	startTime,
	companion,
	reservationDetailIdArr,
}: ApprovalModalPT) {
	const { onCloseModal } = useModal()
	const [requiredTime, setRequiredTime] = useState(0)
	const { mutate: onConfirm } = useScheduleConfirm()
	const endTime = getBeforeOrAfterN(startTime, requiredTime, "after", "minute")

	const onClickConfirmButton = () => {
		const reqBody = createReqBody(startTime, endTime, reservationDetailIdArr)
		onConfirm({
			shopId,
			reservationId,
			reqBody,
		})
	}
	const onClickIncreasingButton = () => {
		setRequiredTime((prev) => prev + 10)
	}
	const onClickDecreasingButton = () => {
		setRequiredTime((prev) => {
			if (prev <= 0) return prev
			return prev - 10
		})
	}
	const isButtonDisabled = requiredTime === 0

	return (
		<ModalContent>
			<ModalHeader className="h-[50px] w-full items-center border-b-[1.5px] border-Gray20 text-center text-Body01 font-SemiBold text-Gray90">
				[예약 수락]
			</ModalHeader>
			<ModalBody className="flex flex-col justify-center gap-[30px] pt-[10px]">
				<PreApprovalSummary {...{ startTime, endTime, companion }} />
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
					<NTButton
						size="small"
						flexible="fit"
						onClick={onClickConfirmButton}
						disabled={isButtonDisabled}
					>
						수락하기
					</NTButton>
				</div>
			</ModalFooter>
		</ModalContent>
	)
}

const createReqBody = (
	startTime: number,
	endTime: number,
	reservationDetailIdArr: number[],
): TReservationDetailList => {
	const reservationDetailList: TReservationDetail[] = []
	reservationDetailIdArr.map((reservationDetailId) => {
		reservationDetailList.push({
			reservationDetailId,
			startTime,
			endTime,
		})
	})
	return {
		reservationDetailList,
	}
}

const useScheduleConfirm = () => {
	const queryClient = getQueryClient()
	const { onOpenModal, onClearModal } = useModal()
	const router = useRouter()
	return useMutation({
		mutationFn: async ({
			shopId,
			reservationId,
			reqBody,
		}: useScheduleConfirmMutationFnPT) =>
			await postScheduleConfirm(shopId, reservationId, reqBody),
		onSuccess: (_, { shopId }) => {
			queryClient.invalidateQueries({
				queryKey: MANAGER_QUERY.scheduleList(shopId).queryKey,
			})
			onClearModal()
		},
		onError: () => {
			onClearModal()
			onOpenModal({
				children: <ErrorModal bodyText="예약 수락 중, 오류가 발생했습니다." />,
			})
		},
		onSettled: () => {
			router.refresh()
		},
	})
}
const postScheduleConfirm = async (
	shopId: number,
	reservationId: number,
	reqBody: TReservationDetailList,
) => {
	const response = await axiosInstance().patch(
		`/shops/${shopId}/reservations/${reservationId}/confirm`,
		reqBody,
	)
	return response.data
}
