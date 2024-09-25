import { NTButton } from "@/component/common/atom/nt-button"
import { useModal } from "@/component/common/nt-modal/nt-modal.context"

import { ShareAddressModal } from "../../../share-modal"

type PhoneNumberButtonPT = { phone: string }
export function PhoneNumberButton({ phone }: PhoneNumberButtonPT) {
	const { onOpenModal } = useModal()
	const formatPhoneNumer = (phone: string) => {
		return `${phone.slice(0, 3)}-${phone.slice(3, 7)}-${phone.slice(7)}`
	}
	const handleShareClick = () => {
		onOpenModal({
			children: (
				<ShareAddressModal data={formatPhoneNumer(phone)} text={"전화번호가"} />
			),
			size: "exSmall",
			isX: false,
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
