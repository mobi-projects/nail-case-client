import { toast } from "sonner"

import { NTButton } from "@/component/common/atom/nt-button"

type PhoneNumberButtonPT = { phone: string; shopName: string }
export function PhoneNumberButton({ phone, shopName }: PhoneNumberButtonPT) {
	const formatPhoneNumer = `${phone.slice(0, 3)}-${phone.slice(3, 7)}-${phone.slice(7)}`

	const handleShareClick = () => {
		toast(`${shopName} : ${formatPhoneNumer}`, {
			action: {
				label: "복사하기",
				onClick: () =>
					navigator.clipboard.writeText(formatPhoneNumer).then(() => {
						toast.success("번호가 복사되었습니다")
					}),
			},
		})
	}
	return (
		<NTButton
			variant="tertiary"
			flexible="full"
			size="small"
			onClick={handleShareClick}
		>
			전화하기
		</NTButton>
	)
}
