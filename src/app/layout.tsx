import "../config/tailwind/global.css"
import type { Metadata } from "next"
import localFont from "next/font/local"

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
			<body className={suit.className}>{children}</body>
		</html>
	)
}
