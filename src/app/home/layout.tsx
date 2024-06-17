import type { Metadata } from "next"

import "../../config/tailwind/global.css"
import ShopShowCase from "@/component/custom/home/layout"

export const metadata: Metadata = {
	title: "오늘네일",
	description: "네일샵 예약 / 관리 서비스",
}

export default function HomeLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<div className="flex w-full flex-col justify-center">
			<ShopShowCase />
			{children}
		</div>
	)
}
