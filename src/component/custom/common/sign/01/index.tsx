import Image from "next/image"

import NTLogo from "@/../public/asset/nt-logo.svg"

export function CommonSignHeader() {
	return (
		<div className="flex h-[250px] w-full flex-col items-center justify-end gap-[20px]">
			<Image src={NTLogo} alt="brand-logo" width={134} height={38} priority />
			<p className="text-Body01">
				{'"'}완벽한 손끝을 위한 당신의 새로운 예약 파트너{'"'}
			</p>
		</div>
	)
}
