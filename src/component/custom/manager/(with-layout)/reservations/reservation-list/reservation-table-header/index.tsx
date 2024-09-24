import NTNameBox from "@/component/common/nt-name-box"

import type { TStatusExcludeCanceled } from "../../reservations.type"

type ReservationTableHeaderPT = {
	focusedStatus: TStatusExcludeCanceled
}

export default function ReservationTableHeader({
	focusedStatus,
}: ReservationTableHeaderPT) {
	return (
		<div className="grid w-full grid-cols-[1fr_2fr_2fr_2fr] py-3">
			<div className="flex h-fit items-center justify-center">
				<NTNameBox bgColor={"BGblue"}>
					{translateStatusToKor(focusedStatus)}
				</NTNameBox>
			</div>
			<p className="text-center text-Body01 font-SemiBold text-Gray80">이름</p>
			<p className="text-center text-Body01 font-SemiBold text-Gray80">
				날짜(요일)
			</p>
			<p className="text-center text-Body01 font-SemiBold text-Gray80">시간</p>
		</div>
	)
}

const translateStatusToKor = (status: TStatusExcludeCanceled) => {
	if (status === "COMPLETED") return "완료"
	if (status === "CONFIRMED") return "확정"
	if (status === "PENDING") return "요청"
	if (status === "REJECTED") return "취소"
}
