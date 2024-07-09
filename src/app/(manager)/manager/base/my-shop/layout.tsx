import type { PropsWithChildren } from "react"

import ManagerBaseMyShopBanner from "@/component/custom/manager/base/my-shop/layout/01"

export default function ManagerBaseMyShopLayout({
	children,
}: Readonly<PropsWithChildren>) {
	return (
		<div className="flex w-full flex-col">
			<ManagerBaseMyShopBanner />
			{children}
		</div>
	)
}
