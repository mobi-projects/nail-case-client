import type { Metadata } from "next"
import localFont from "next/font/local"

import { ModalProvider } from "@/component/common/nt-modal/nt-modal.context"
import { SheetProvider } from "@/component/common/nt-sheet/nt-sheet.context"
import { AuthProvider } from "@/config/auth-provider"
import { TanstackQueryProvider } from "@/config/tanstack-query"
import "../config/tailwind/global.css"

const suit = localFont({
	src: [
		{
			path: "../../public/font/SUIT-Light.ttf",
			weight: "300",
		},
		{
			path: "../../public/font/SUIT-Regular.ttf",
			weight: "400",
		},
		{
			path: "../../public/font/SUIT-SemiBold.ttf",
			weight: "600",
		},
		{
			path: "../../public/font/SUIT-ExtraBold.ttf",
			weight: "800",
		},
	],
})

export const metadata: Metadata = {
	title: "오늘네일",
	description: "네일샵 예약 / 관리 서비스",
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang="kr">
			<body className={suit.className}>
				<TanstackQueryProvider>
					<AuthProvider>
						<SheetProvider>
							<ModalProvider>
								<div className="flex w-full justify-center">
									<main className="w-[1200px] text-wrap break-all">
										{children}
									</main>
								</div>
							</ModalProvider>
						</SheetProvider>
					</AuthProvider>
				</TanstackQueryProvider>
			</body>
		</html>
	)
}
