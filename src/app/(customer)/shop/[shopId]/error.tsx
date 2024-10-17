"use client"

import { useRouter } from "next/navigation"

import { NTButton } from "@/component/common/atom/nt-button"

type ShopDetailErrorPT = {
	reset: VoidFunction
}

export default function ShopDetailError({ reset }: ShopDetailErrorPT) {
	const router = useRouter()
	const onClickBackBtn = () => {
		router.push(`/`)
	}
	const onClickRetryBtn = () => {
		reset()
	}

	return (
		<div className="flex h-screen items-center justify-center">
			<div className="flex flex-col items-center space-y-4">
				<div className="grid grid-rows-[50px_30px_30px]">
					<p className="flex items-center justify-center text-Title01 text-Gray70">
						문제가 발생하여 화면을 불러오는데 실패했습니다.
					</p>
					<p className="flex items-center justify-center text-Body01 text-Gray70">
						재시도 버튼을 눌러 다시 시도해 보세요.
					</p>
					<p className="flex items-center justify-center text-Body01 text-Gray70">
						그래도 문제가 지속된다면 잠시 후 다시 시도해 주세요.
					</p>
				</div>
				<div className="flex space-x-2">
					<NTButton variant="primary" flexible="fit" onClick={onClickRetryBtn}>
						재시도
					</NTButton>
					<NTButton variant="secondary" flexible="fit" onClick={onClickBackBtn}>
						홈으로
					</NTButton>
				</div>
			</div>
		</div>
	)
}
