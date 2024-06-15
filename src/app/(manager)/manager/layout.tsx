"use client"
import Header from "@/component/custom/home/header"

export default function ManagerLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<div className="max-w-dvw">
			<Header />
			{children}
		</div>
	)
}
