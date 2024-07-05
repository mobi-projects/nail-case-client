import Image from "next/image"

import NTLogo from "@/../public/asset/nt-logo.svg"

export default function BrandInfo() {
	return (
		<div className="flex h-full w-full flex-col items-center justify-center gap-[20px]">
			<Image src={NTLogo} alt="brand-logo" width={200} height={70} priority />
			<p className="text-Body01">
				{'"'}완벽한 손끝을 위한 당신의 새로운 예약 파트너{'"'}
			</p>
		</div>
	)
}
