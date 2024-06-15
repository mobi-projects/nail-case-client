import type { Metadata } from "next"

import "../../config/tailwind/global.css"

export const metadata: Metadata = {
	title: "오늘네일",
	description: "네일샵 예약 / 관리 서비스",
}

export default function HomeAdminLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<div className="flex w-dvw flex-col justify-center">
			<div className="flex h-full w-full justify-center">
				<main className="w-[1200px] text-wrap break-all">{children}</main>
			</div>
		</div>
	)
}
