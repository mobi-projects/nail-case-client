import type { PropsWithChildren } from "react"

import Manager_Base_MyShop_Layout_01 from "@/component/custom/manager/base/my-shop/layout/01"

export default function ManagerBaseMyShopLayout({
	children,
}: Readonly<PropsWithChildren>) {
	return (
		<div className="flex w-full flex-col">
			<Manager_Base_MyShop_Layout_01 />
			<Divider />
			{children}
		</div>
	)
}
function Divider() {
	return <div className="h-[1.5px] w-full bg-Gray20" />
}
