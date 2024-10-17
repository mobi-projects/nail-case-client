import { useRouter } from "next/navigation"

import NTIcon from "@/component/common/nt-icon"
import { COMMON_HOME } from "@/constant/routing-path"

export function RoutingButtonList() {
	const router = useRouter()

	const navigateBack = () => {
		router.back()
	}

	const navigateHome = () => {
		router.push(COMMON_HOME)
	}

	return (
		<div className="flex h-full w-7 gap-2">
			<NTIcon
				className="mt-[1px] aspect-square w-10 text-White drop-shadow-[0_0_1px_rgba(0,0,0,0.9)] hover:cursor-pointer"
				icon="back"
				onClick={navigateBack}
			/>
			<NTIcon
				className="aspect-square w-10 text-White drop-shadow-[0_0_1px_rgba(0,0,0,0.9)] hover:cursor-pointer"
				icon="homeLight"
				onClick={navigateHome}
			/>
		</div>
	)
}
