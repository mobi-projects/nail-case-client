import type { PropsWithChildren } from "react"

import ScheduleLayout from "@/component/custom/manager/base/schedule/layout/01"

export default function ManagerBaseScheduleLayout({
	children,
}: Readonly<PropsWithChildren>) {
	return (
		<div className="flex w-full flex-col pb-[102px]">
			<ScheduleLayout />
			{children}
		</div>
	)
}
