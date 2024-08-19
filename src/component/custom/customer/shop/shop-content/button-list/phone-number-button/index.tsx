import { NTButton } from "@/component/common/atom/nt-button"
import { useModal } from "@/component/common/nt-modal/nt-modal.context"

import { NumberModal } from "./number-modal"
type PhoneNumberButtonPT = { phoneNumber: string }
export function PhoneNumberButton({ phoneNumber }: PhoneNumberButtonPT) {
	const { onOpenModal } = useModal()

	const handlePhoneButton = () => {
		onOpenModal({
			children: <NumberModal phoneNumber={phoneNumber} />,
			size: "exSmall",
			isX: false,
		})
	}

	return (
		<NTButton
			variant="tertiary"
			flexible="full"
			size="small"
			onClick={handlePhoneButton}
		>
			전화하기
		</NTButton>
	)
}
