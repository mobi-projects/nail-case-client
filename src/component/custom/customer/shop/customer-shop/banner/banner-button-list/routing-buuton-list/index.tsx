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
		<div className="flex h-full gap-3 max-md:gap-x-1">
			<NTIcon
				className="mt-[1px] aspect-square w-10 text-White drop-shadow-[0_0_1px_rgba(0,0,0,0.9)] hover:cursor-pointer lg:h-8 lg:w-8 max-md:h-6 max-md:w-6"
				icon="back"
				onClick={navigateBack}
			/>
			<NTIcon
				className="aspect-square w-10 text-White drop-shadow-[0_0_1px_rgba(0,0,0,0.9)] hover:cursor-pointer lg:h-8 lg:w-8 max-md:h-6 max-md:w-6"
				icon="homeLight"
				onClick={navigateHome}
			/>
		</div>
	)
}
