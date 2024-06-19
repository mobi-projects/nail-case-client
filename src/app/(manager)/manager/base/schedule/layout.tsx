import type { PropsWithChildren } from "react"

import Manager_Base_Schedule_Layout_01 from "@/component/custom/manager/base/schedule/layout/01"

export default function ManagerBaseScheduleLayout({
	children,
}: Readonly<PropsWithChildren>) {
	return (
		<div className="flex w-full flex-col pb-[102px]">
			<Manager_Base_Schedule_Layout_01 />
			{children}
		</div>
	)
}
