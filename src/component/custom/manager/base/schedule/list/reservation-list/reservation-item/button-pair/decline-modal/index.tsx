import { useMutation } from "@tanstack/react-query"
import { useRouter } from "next/navigation"

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

import ErrorModal from "../error-modal"

import type {
	DeclineModalPT,
	useScheduleCancelMutationFnPT,
} from "./decline-modal.type"

export default function DeclineModal({
	shopId,
	reservationId,
}: DeclineModalPT) {
	const { onCloseModal } = useModal()
	const { mutate: onCancel } = useScheduleCancel()
	return (
		<ModalContent>
			<ModalHeader className="h-[50px] w-full items-center border-b-[1.5px] border-Gray20 text-center text-Body01 font-SemiBold text-Gray90">
				[예약 거절]
			</ModalHeader>
			<ModalBody className="flex flex-col gap-[10px] py-[25px]">
				<li className="break-keep text-Callout text-Gray50">
					예약자에게 거절 안내가 전달됩니다.
				</li>
				<li className="break-keep text-Callout text-Gray50">
					예약 거절은 가능한 빠르게 진행해주세요.
				</li>
				<li className="break-keep text-Callout text-Gray50">
					예약을 거절할 경우, 해당 예약을 되돌릴 수 없습니다.
				</li>
			</ModalBody>
			<ModalFooter className="flex items-center justify-center gap-[10px]">
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
					variant="alert"
					onClick={() => onCancel({ shopId, reservationId })}
				>
					거절하기
				</NTButton>
			</ModalFooter>
		</ModalContent>
	)
}

const useScheduleCancel = () => {
	const queryClient = getQueryClient()
	const { onOpenModal, onClearModal } = useModal()
	const router = useRouter()
	return useMutation({
		mutationFn: async ({
			shopId,
			reservationId,
		}: useScheduleCancelMutationFnPT) =>
			postScheduleCancel(shopId, reservationId),

		onSuccess: (_, { shopId }) => {
			queryClient.invalidateQueries({
				queryKey: MANAGER_QUERY.scheduleList(shopId).queryKey,
			})
			onClearModal()
		},
		onError: () => {
			onClearModal()
			onOpenModal({
				children: <ErrorModal bodyText="예약 거절 중, 오류가 발생했습니다." />,
			})
		},
		onSettled: () => {
			router.refresh()
		},
	})
}

const postScheduleCancel = async (shopId: number, reservationId: number) => {
	const response = await axiosInstance().patch(
		`/shops/${shopId}/reservations/${reservationId}/reject`,
	)
	return response.data
}
