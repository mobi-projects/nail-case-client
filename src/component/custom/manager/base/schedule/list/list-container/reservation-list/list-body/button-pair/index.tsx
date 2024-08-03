import { NTButton } from "@/component/common/atom/nt-button"

export function ButtonPair() {
	return (
		<div className="flex flex-col items-center justify-center gap-[20px]">
			<NTButton variant="secondary" size="small">
				수락
			</NTButton>
			<NTButton variant="alert" size="small">
				거절
			</NTButton>
		</div>
	)
}
