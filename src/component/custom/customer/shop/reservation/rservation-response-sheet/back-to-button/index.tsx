import { useRouter } from "next/navigation"

import { NTButton } from "@/component/common/atom/nt-button"
import type { ICON_DATA } from "@/component/common/nt-icon"
import { useSheet } from "@/component/common/nt-sheet/nt-sheet.context"

type BackToButtonPT = {
	shopId: number
	buttonType: "home" | "shop" | "reservation"
}

export default function BackToButton({ buttonType, shopId }: BackToButtonPT) {
	const router = useRouter()
	const { onCloseSheet } = useSheet()

	const destinations: { [key in typeof buttonType]: string } = {
		home: "/",
		shop: `/shop/${shopId}`,
		reservation: `/shop/${shopId}/reservation`,
	}
	const icons: { [key in typeof buttonType]: keyof typeof ICON_DATA } = {
		home: "homeLight",
		shop: "shopLight",
		reservation: "back",
	}
	const labels: { [key in typeof buttonType]: string } = {
		home: "홈으로 돌아가기",
		shop: "매장으로 돌아가기",
		reservation: "다시 예약하기",
	}

	const onClickButton = () => {
		router.replace(destinations[buttonType])
		onCloseSheet()
	}

	return (
		<NTButton
			variant={buttonType == "home" ? "primary" : "secondary"}
			size="small"
			flexible="full"
			icon={icons[buttonType]}
			onClick={onClickButton}
		>
			{labels[buttonType]}
		</NTButton>
	)
}
