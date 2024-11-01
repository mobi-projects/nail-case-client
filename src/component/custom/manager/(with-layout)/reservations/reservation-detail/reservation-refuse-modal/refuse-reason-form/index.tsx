import type { Dispatch, FormEvent, SetStateAction } from "react"
import { useState } from "react"

import { NTButton } from "@/component/common/atom/nt-button"
import { cn } from "@/config/tailwind"
import { useMutateRefuseReservation } from "@/hook/use-reservation-controller"

import CheckBox from "../check-box"

type RefuseReasonFormPT = {
	shopId: number
	reservationId: number
	setIsOpen: Dispatch<SetStateAction<boolean>>
}

export default function RefuseReasonForm({
	reservationId,
	shopId,
	setIsOpen,
}: RefuseReasonFormPT) {
	const [clickedIdx, setClickedIdx] = useState(-1)
	const [isValid, setIsValid] = useState(true)
	const [errorMessage, setErrorMessage] = useState("")
	const { mutate } = useMutateRefuseReservation(shopId, reservationId)

	const onSubmit = (e: FormEvent<HTMLFormElement>, clickedIdx: number) => {
		e.preventDefault()
		const message = getRefusalReasonMessage(clickedIdx, e)
		const customReason = e.currentTarget.customReason.value

		// 직접 입력이 선택됐을 때 유효성 검사를 수행
		if (clickedIdx === 3) {
			const errorMsg = getErrorMessage(customReason)
			if (errorMsg) {
				setIsValid(false)
				setErrorMessage(errorMsg)
				return
			}
		}

		// 유효성 통과 시
		setIsValid(true)
		setErrorMessage("")
		mutate({ rejectReason: message })
		setIsOpen(false)
	}

	return (
		<form
			className="grid h-full w-full grid-rows-[1fr_auto]"
			onSubmit={(e) => {
				onSubmit(e, clickedIdx)
			}}
		>
			<div className="flex h-full flex-col gap-y-5 pl-5 pt-6 max-lg:pl-3">
				<div className="flex h-fit items-center gap-x-2 py-2">
					<CheckBox
						id="1"
						setClickedIdx={setClickedIdx}
						clickedIdx={clickedIdx}
					/>
					<label className="h-full cursor-pointer text-Callout" htmlFor="1">
						재료 소진
					</label>
				</div>
				<div className="flex h-fit items-center gap-x-2 py-2">
					<CheckBox
						id="2"
						setClickedIdx={setClickedIdx}
						clickedIdx={clickedIdx}
					/>
					<label className="cursor-pointer text-Callout" htmlFor="2">
						해당시간 예약마감
					</label>
				</div>
				<div className="flex h-fit items-center gap-x-2 py-2">
					<CheckBox
						id="3"
						setClickedIdx={setClickedIdx}
						clickedIdx={clickedIdx}
					/>
					<label className="cursor-pointer text-Callout" htmlFor="3">
						직접 입력
					</label>
				</div>
				<div className="flex flex-col">
					<textarea
						className={cn(
							"scrollbar resize-none rounded-md p-2 text-Body01 outline-none ring-2 transition-all",
							clickedIdx === 3
								? "h-[8rem] w-[27rem] border border-PB60 lg:h-[7rem] lg:w-[70dvw] max-md:h-[5rem] max-md:w-[80dvw]"
								: "h-0 opacity-0",
						)}
						placeholder="거절 사유를 입력해주세요 (최대 100자)"
						name="customReason"
					/>
					<p
						className={cn(
							"h-fit pt-1 text-Caption01 text-red-600",
							clickedIdx === 3 && !isValid ? "opacity-100" : "opacity-0",
						)}
					>
						* {errorMessage}
					</p>
				</div>
			</div>
			<div className="flex h-fit w-full justify-center">
				<NTButton
					variant={"alert"}
					size={"small"}
					flexible={"none"}
					type="submit"
					disabled={clickedIdx === -1}
				>
					예약 취소
				</NTButton>
			</div>
		</form>
	)
}

// 서버로 보낼 거절 사유
const getRefusalReasonMessage = (
	idx: number,
	e: FormEvent<HTMLFormElement>,
) => {
	if (idx === 1) return "재료 소진"
	if (idx === 2) return "해당시간 예약마감"
	if (idx === 3) return e.currentTarget.customReason.value
}

// 에러 메시지 처리 함수
const getErrorMessage = (message: string) => {
	// 메시지가 비어 있을 경우
	if (!message || message.trim() === "")
		return "거절 사유가 입력되지 않았습니다."

	// 메시지가 100자를 넘을 경우
	if (message.length > 100) return "거절 사유는 100자를 넘을 수 없습니다."

	// 유효성 통과 시
	return ""
}
