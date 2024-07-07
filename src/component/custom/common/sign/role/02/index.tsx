"use client"
import { useRouter } from "next/navigation"
import type { HTMLAttributes, PropsWithChildren } from "react"

import { COMMON_HOME, MANAGER_BASE_HOME } from "@/constant/routing-path"

export default function RoutingCardList() {
	const router = useRouter()
	return (
		<div className="flex flex-col gap-[25px]">
			<RoutingCard onClick={() => router.push(MANAGER_BASE_HOME)}>
				<span className="flex gap-2 text-Headline02 font-SemiBold text-Gray80">
					<p className="text-PB100">샵 운영자</p>
					<p>로 로그인하기</p>
				</span>
			</RoutingCard>

			<RoutingCard onClick={() => router.push(COMMON_HOME)}>
				<span className="flex gap-2 text-Headline02 font-SemiBold text-Gray80">
					<p className="text-Gray40">일반 사용자</p>
					<p>로 로그인하기</p>
				</span>
			</RoutingCard>
		</div>
	)
}
function RoutingCard({
	children,
	...rest
}: PropsWithChildren & HTMLAttributes<HTMLButtonElement>) {
	return (
		<button
			className="flex h-[86px] w-[500px] cursor-pointer items-center justify-center rounded-[12px] text-center shadow-customGray80 transition-all hover:scale-95 active:bg-Gray10"
			{...rest}
		>
			{children}
		</button>
	)
}
