import { useRouter } from "next/router"

import { NTButton } from "@/component/common/atom/nt-button"

export default function ShopError() {
	const router = useRouter()
	const navigateBack = () => {
		router.back()
	}
	return (
		<div className="flex h-screen items-center justify-center">
			<div className="flex items-center space-x-2">
				<p className="font-medium text-lg">네트워크 오류가 발생했습니다 </p>
				<NTButton variant="secondary" flexible="fit" onClick={navigateBack}>
					이전으로
				</NTButton>
			</div>
		</div>
	)
}
