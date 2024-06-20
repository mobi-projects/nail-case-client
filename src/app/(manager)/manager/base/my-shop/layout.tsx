import type { PropsWithChildren } from "react"

import ManagerMyShopLayout from "@/component/custom/manager/base/my-shop/layout/01"

export default function ManagerBaseMyShopLayout({
	children,
}: Readonly<PropsWithChildren>) {
	return (
		<div className="flex w-full flex-col">
			<ManagerMyShopLayout />
			<Divider />
			{children}
		</div>
	)
}
function Divider() {
	return <div className="h-[1.5px] w-full bg-Gray20" />
}
