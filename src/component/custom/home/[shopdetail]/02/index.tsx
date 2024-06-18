"use client"

import NTToolbar from "@/component/common/atom/nt-toolbar"
import { useToolbar } from "@/hook/use-component"

export default function Toolbar() {
	const { hadleSelected, isSelected, toolbarArr } = useToolbar([
		"홈",
		"디자인",
		"소식",
		"리뷰",
	])
	return (
		<div className="flex w-full items-center justify-center border-b-[1.5px] border-b-Gray20">
			<NTToolbar
				arr={toolbarArr}
				isSelected={hadleSelected}
				selected={isSelected}
				position="bottom"
			/>
		</div>
	)
}
