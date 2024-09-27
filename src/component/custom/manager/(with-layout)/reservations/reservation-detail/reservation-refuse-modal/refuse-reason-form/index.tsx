import { useState } from "react"

import { NTButton } from "@/component/common/atom/nt-button"
import { useModal } from "@/component/common/nt-modal/nt-modal.context"
import { cn } from "@/config/tailwind"

import CheckBox from "../check-box"

export default function RefuseReasonForm() {
	const [clickedIdx, setClickedIdx] = useState(-1)
	const { onCloseModal } = useModal()

	return (
		<form className="grid h-full w-full grid-rows-[1fr_auto]">
			<div className="flex h-full flex-col gap-y-5 pl-10 pt-6">
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
				<textarea
					className={cn(
						"scrollbar h-[8rem] w-[24rem] resize-none rounded-md p-2 outline-none ring-2 transition-all",
						clickedIdx === 3
							? "h-[8rem] border border-PB60 opacity-100"
							: "h-0 opacity-0",
					)}
					placeholder="거절 사유를 입력해주세요 (최대 100자)"
				/>
			</div>
			<div className="flex h-fit w-full justify-center">
				<NTButton
					variant={"alert"}
					size={"exSmall"}
					flexible={"fit"}
					onClick={() => {
						onCloseModal()
					}}
				>
					예약 취소
				</NTButton>
			</div>
		</form>
	)
}
