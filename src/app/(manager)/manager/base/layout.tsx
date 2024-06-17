"use client"

import ManagerBaseHeader from "@/component/custom/manager/base/home/layout"

export default function ManagerBaseLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<div className="max-w-dvw">
			<ManagerBaseHeader />
			{children}
		</div>
	)
}
