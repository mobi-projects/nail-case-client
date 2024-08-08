import { useRouter } from "next/navigation"

import { NTButton } from "@/component/common/atom/nt-button"

type ReservationScheduleSubComponentPT = {
	shopId: number
}

export function ReservationButton({
	shopId,
}: ReservationScheduleSubComponentPT) {
	const router = useRouter()
	return (
		<NTButton
			variant="tertiary"
			flexible="full"
			size="small"
			onClick={() => {
				router.push(`/shop/${shopId}/reservation`)
			}}
		>
			예약하기
		</NTButton>
	)
}
