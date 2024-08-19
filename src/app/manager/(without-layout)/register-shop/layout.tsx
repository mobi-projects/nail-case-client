import type { ReactNode } from "react"

import { Manager_Sub_Layout_01 } from "@/component/custom/manager/(without-layout)/layout"

export default function ManagerLayout({
	children,
}: Readonly<{
	children: ReactNode
}>) {
	return (
		<div className="flex h-full w-full flex-col">
			<Manager_Sub_Layout_01 />
			{children}
		</div>
	)
}
