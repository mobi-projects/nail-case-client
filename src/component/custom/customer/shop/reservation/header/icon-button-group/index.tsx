"use client"

import { useRouter } from "next/navigation"

import NTIcon from "@/component/common/nt-icon"
import { CUSTOMER_SHOP } from "@/constant/routing-path"

type IconButtonGroupPT = { shopId: number }

export default function IconButtonGroup({ shopId }: IconButtonGroupPT) {
	const router = useRouter()
	return (
		<section className="flex h-fit items-center gap-[8px]">
			<NTIcon
				className="h-9 pt-1 text-Black max-lg:h-7"
				icon="back"
				onClick={() => router.back()}
			/>
			<NTIcon
				className="h-9 text-Black max-lg:h-7"
				icon="homeLight"
				onClick={() => router.replace(`${CUSTOMER_SHOP}/${shopId}`)}
			/>
		</section>
	)
}
