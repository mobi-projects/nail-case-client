"use client"
import { useState } from "react"

import NTToolbar from "@/component/common/atom/nt-toolbar"

export default function TabBar() {
	const [onSelected, setOnSelected] = useState(0)
	const hadleSelected = (idx: number) => {
		setOnSelected(idx)
	}
	return (
		<>
			<hr className="w-full" />
			<div className="h-[52px] w-full max-w-[1200px]">
				<NTToolbar
					position="top"
					topStyle="default"
					arr={["홈", "일정", "채팅", "내 샵"]}
					selected={onSelected}
					isSelected={hadleSelected}
				/>
			</div>
		</>
	)
}
